import { Flex } from '@chakra-ui/react';
import { Feature } from 'app/features';
import FaceRestoreSettings from 'features/parameters/components/AdvancedParameters/FaceRestore/FaceRestoreSettings';
import FaceRestoreToggle from 'features/parameters/components/AdvancedParameters/FaceRestore/FaceRestoreToggle';
import OutputSettings from 'features/parameters/components/AdvancedParameters/Output/OutputSettings';
import SymmetrySettings from 'features/parameters/components/AdvancedParameters/Output/SymmetrySettings';
import SymmetryToggle from 'features/parameters/components/AdvancedParameters/Output/SymmetryToggle';
import SeedSettings from 'features/parameters/components/AdvancedParameters/Seed/SeedSettings';
import UpscaleSettings from 'features/parameters/components/AdvancedParameters/Upscale/UpscaleSettings';
import UpscaleToggle from 'features/parameters/components/AdvancedParameters/Upscale/UpscaleToggle';
import GenerateVariationsToggle from 'features/parameters/components/AdvancedParameters/Variations/GenerateVariations';
import VariationsSettings from 'features/parameters/components/AdvancedParameters/Variations/VariationsSettings';
import LoraManager from 'features/parameters/components/LoraManager/LoraManager';
import TextualInversionManager from 'features/parameters/components/TextualInversionManager/TextualInversionManager';
import MainSettings from 'features/parameters/components/MainParameters/MainParameters';
import ParametersAccordion from 'features/parameters/components/ParametersAccordion';
import ProcessButtons from 'features/parameters/components/ProcessButtons/ProcessButtons';
import NegativePromptInput from 'features/parameters/components/PromptInput/NegativePromptInput';
import PromptInput from 'features/parameters/components/PromptInput/PromptInput';
import InvokeOptionsPanel from 'features/ui/components/InvokeParametersPanel';
import { useTranslation } from 'react-i18next';

export default function TextToImagePanel() {
  const { t } = useTranslation();

  const textToImageAccordions = {
    seed: {
      header: `${t('parameters.seed')}`,
      feature: Feature.SEED,
      content: <SeedSettings />,
    },
    variations: {
      header: `${t('parameters.variations')}`,
      feature: Feature.VARIATIONS,
      content: <VariationsSettings />,
      additionalHeaderComponents: <GenerateVariationsToggle />,
    },
    face_restore: {
      header: `${t('parameters.faceRestoration')}`,
      feature: Feature.FACE_CORRECTION,
      content: <FaceRestoreSettings />,
      additionalHeaderComponents: <FaceRestoreToggle />,
    },
    upscale: {
      header: `${t('parameters.upscaling')}`,
      feature: Feature.UPSCALE,
      content: <UpscaleSettings />,
      additionalHeaderComponents: <UpscaleToggle />,
    },
    symmetry: {
      header: `${t('parameters.symmetry')}`,
      content: <SymmetrySettings />,
      additionalHeaderComponents: <SymmetryToggle />,
    },
    other: {
      header: `${t('parameters.otherOptions')}`,
      feature: Feature.OTHER,
      content: <OutputSettings />,
    },
  };

  return (
    <InvokeOptionsPanel>
      <Flex flexDir="column" rowGap="0.5rem">
        <PromptInput />
        <NegativePromptInput />
        <LoraManager />
        <TextualInversionManager />
      </Flex>
      <ProcessButtons />
      <MainSettings />
      <ParametersAccordion accordionInfo={textToImageAccordions} />
    </InvokeOptionsPanel>
  );
}
