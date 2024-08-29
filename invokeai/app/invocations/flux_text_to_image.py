from typing import Optional

import torch
import torchvision.transforms as tv_transforms
from torchvision.transforms.functional import resize as tv_resize

from invokeai.app.invocations.baseinvocation import BaseInvocation, Classification, invocation
from invokeai.app.invocations.fields import (
    DenoiseMaskField,
    FieldDescriptions,
    FluxConditioningField,
    Input,
    InputField,
    LatentsField,
    WithBoard,
    WithMetadata,
)
from invokeai.app.invocations.model import TransformerField
from invokeai.app.invocations.primitives import LatentsOutput
from invokeai.app.services.session_processor.session_processor_common import CanceledException
from invokeai.app.services.shared.invocation_context import InvocationContext
from invokeai.backend.flux.denoise import denoise
from invokeai.backend.flux.model import Flux
from invokeai.backend.flux.sampling_utils import (
    generate_img_ids,
    get_noise,
    get_schedule,
    pack,
    unpack,
)
from invokeai.backend.stable_diffusion.diffusion.conditioning_data import FLUXConditioningInfo
from invokeai.backend.util.devices import TorchDevice

EPS = 1e-6


@invocation(
    "flux_text_to_image",
    title="FLUX Text to Image",
    tags=["image", "flux"],
    category="image",
    version="2.0.0",
    classification=Classification.Prototype,
)
class FluxTextToImageInvocation(BaseInvocation, WithMetadata, WithBoard):
    """Text-to-image generation using a FLUX model."""

    # If latents is provided, this means we are doing image-to-image.
    latents: Optional[LatentsField] = InputField(
        default=None,
        description=FieldDescriptions.latents,
        input=Input.Connection,
    )
    denoise_mask: Optional[DenoiseMaskField] = InputField(
        default=None,
        description=FieldDescriptions.denoise_mask,
        input=Input.Connection,
    )
    denoising_start: float = InputField(
        default=0.0,
        ge=0,
        le=1,
        description=FieldDescriptions.denoising_start,
    )
    transformer: TransformerField = InputField(
        description=FieldDescriptions.flux_model,
        input=Input.Connection,
        title="Transformer",
    )
    positive_text_conditioning: FluxConditioningField = InputField(
        description=FieldDescriptions.positive_cond, input=Input.Connection
    )
    width: int = InputField(default=1024, multiple_of=16, description="Width of the generated image.")
    height: int = InputField(default=1024, multiple_of=16, description="Height of the generated image.")
    num_steps: int = InputField(
        default=4, description="Number of diffusion steps. Recommended values are schnell: 4, dev: 50."
    )
    guidance: float = InputField(
        default=4.0,
        description="The guidance strength. Higher values adhere more strictly to the prompt, and will produce less diverse images. FLUX dev only, ignored for schnell.",
    )
    seed: int = InputField(default=0, description="Randomness seed for reproducibility.")

    @torch.no_grad()
    def invoke(self, context: InvocationContext) -> LatentsOutput:
        latents = self._run_diffusion(context)
        latents = latents.detach().to("cpu")

        name = context.tensors.save(tensor=latents)
        return LatentsOutput.build(latents_name=name, latents=latents, seed=None)

    def _run_diffusion(
        self,
        context: InvocationContext,
    ):
        inference_dtype = torch.bfloat16

        # Load the conditioning data.
        cond_data = context.conditioning.load(self.positive_text_conditioning.conditioning_name)
        assert len(cond_data.conditionings) == 1
        flux_conditioning = cond_data.conditionings[0]
        assert isinstance(flux_conditioning, FLUXConditioningInfo)
        flux_conditioning = flux_conditioning.to(dtype=inference_dtype)
        t5_embeddings = flux_conditioning.t5_embeds
        clip_embeddings = flux_conditioning.clip_embeds

        # Load the input latents, if provided.
        init_latents = context.tensors.load(self.latents.latents_name) if self.latents else None
        if init_latents is not None:
            init_latents = init_latents.to(device=TorchDevice.choose_torch_device(), dtype=inference_dtype)

        # Prepare input noise.
        noise = get_noise(
            num_samples=1,
            height=self.height,
            width=self.width,
            device=TorchDevice.choose_torch_device(),
            dtype=inference_dtype,
            seed=self.seed,
        )

        transformer_info = context.models.load(self.transformer.transformer)
        is_schnell = "schnell" in transformer_info.config.config_path

        image_seq_len = noise.shape[-1] * noise.shape[-2] // 4
        timesteps = get_schedule(
            num_steps=self.num_steps,
            image_seq_len=image_seq_len,
            shift=not is_schnell,
        )

        # Prepare input latent image.
        if self.denoising_start > EPS:
            # If denoising_start > 0, we are doing image-to-image.
            if init_latents is None:
                raise ValueError("latents must be provided if denoising_start > 0.")

            # Clip the timesteps schedule based on denoising_start.
            # TODO(ryand): Should we apply denoising_start in timestep-space rather than timestep-index-space?
            start_idx = int(self.denoising_start * len(timesteps))
            timesteps = timesteps[start_idx:]

            # Noise the orig_latents by the appropriate amount for the first timestep.
            t_0 = timesteps[0]
            x = t_0 * noise + (1.0 - t_0) * init_latents
        else:
            # We are not doing image-to-image, so we are starting from noise.
            x = noise

        # Prepare inpaint mask.
        inpaint_mask = self._prep_inpaint_mask(context, x)
        if inpaint_mask is not None:
            assert init_latents is not None
            # Expand the inpaint mask to the same shape as the init_latents so that when we pack inpaint_mask it lines
            # up with the init_latents.
            inpaint_mask = inpaint_mask.expand_as(init_latents)

        b, _c, h, w = x.shape
        img_ids = generate_img_ids(h=h, w=w, batch_size=b, device=x.device, dtype=x.dtype)

        bs, t5_seq_len, _ = t5_embeddings.shape
        txt_ids = torch.zeros(bs, t5_seq_len, 3, dtype=inference_dtype, device=TorchDevice.choose_torch_device())

        # Pack all latent tensors.
        init_latents = pack(init_latents) if init_latents is not None else None
        inpaint_mask = pack(inpaint_mask) if inpaint_mask is not None else None
        noise = pack(noise)
        x = pack(x)

        # Verify that we calculated the image_seq_len correctly.
        assert image_seq_len == x.shape[1]

        with transformer_info as transformer:
            assert isinstance(transformer, Flux)

            def step_callback() -> None:
                if context.util.is_canceled():
                    raise CanceledException

                # TODO: Make this look like the image before re-enabling
                # latent_image = unpack(img.float(), self.height, self.width)
                # latent_image = latent_image.squeeze()  # Remove unnecessary dimensions
                # flattened_tensor = latent_image.reshape(-1)  # Flatten to shape [48*128*128]

                # # Create a new tensor of the required shape [255, 255, 3]
                # latent_image = flattened_tensor[: 255 * 255 * 3].reshape(255, 255, 3)  # Reshape to RGB format

                # # Convert to a NumPy array and then to a PIL Image
                # image = Image.fromarray(latent_image.cpu().numpy().astype(np.uint8))

                # (width, height) = image.size
                # width *= 8
                # height *= 8

                # dataURL = image_to_dataURL(image, image_format="JPEG")

                # # TODO: move this whole function to invocation context to properly reference these variables
                # context._services.events.emit_invocation_denoise_progress(
                #     context._data.queue_item,
                #     context._data.invocation,
                #     state,
                #     ProgressImage(dataURL=dataURL, width=width, height=height),
                # )

            x = denoise(
                model=transformer,
                img=x,
                img_ids=img_ids,
                txt=t5_embeddings,
                txt_ids=txt_ids,
                vec=clip_embeddings,
                timesteps=timesteps,
                step_callback=step_callback,
                guidance=self.guidance,
                init_latents=init_latents,
                noise=noise,
                inpaint_mask=inpaint_mask,
            )

        x = unpack(x.float(), self.height, self.width)

        return x

    def _prep_inpaint_mask(self, context: InvocationContext, latents: torch.Tensor) -> torch.Tensor | None:
        """Prepare the inpaint mask.

        Loads the mask, resizes if necessary, casts to same device/dtype as latents.

        Returns:
            tuple[torch.Tensor | None, bool]: (mask, is_gradient_mask)
        """
        if self.denoise_mask is None:
            return None

        mask = context.tensors.load(self.denoise_mask.mask_name)
        _, _, latent_height, latent_width = latents.shape
        mask = tv_resize(
            img=mask,
            size=[latent_height, latent_width],
            interpolation=tv_transforms.InterpolationMode.BILINEAR,
            antialias=False,
        )
        mask = mask.to(device=latents.device, dtype=latents.dtype)
        return mask
