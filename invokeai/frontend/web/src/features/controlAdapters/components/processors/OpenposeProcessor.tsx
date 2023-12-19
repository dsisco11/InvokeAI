import { InvControl, InvSlider, InvSwitch } from 'common/components';
import { CONTROLNET_PROCESSORS } from 'features/controlAdapters/store/constants';
import { RequiredOpenposeImageProcessorInvocation } from 'features/controlAdapters/store/types';
import { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useProcessorNodeChanged } from 'features/controlAdapters/components/hooks/useProcessorNodeChanged';
import ProcessorWrapper from './common/ProcessorWrapper';

const DEFAULTS = CONTROLNET_PROCESSORS.openpose_image_processor
  .default as RequiredOpenposeImageProcessorInvocation;

type Props = {
  controlNetId: string;
  processorNode: RequiredOpenposeImageProcessorInvocation;
  isEnabled: boolean;
};

const OpenposeProcessor = (props: Props) => {
  const { controlNetId, processorNode, isEnabled } = props;
  const { image_resolution, detect_resolution, hand_and_face } = processorNode;
  const processorChanged = useProcessorNodeChanged();
  const { t } = useTranslation();

  const handleDetectResolutionChanged = useCallback(
    (v: number) => {
      processorChanged(controlNetId, { detect_resolution: v });
    },
    [controlNetId, processorChanged]
  );

  const handleImageResolutionChanged = useCallback(
    (v: number) => {
      processorChanged(controlNetId, { image_resolution: v });
    },
    [controlNetId, processorChanged]
  );

  const handleDetectResolutionReset = useCallback(() => {
    processorChanged(controlNetId, {
      detect_resolution: DEFAULTS.detect_resolution,
    });
  }, [controlNetId, processorChanged]);

  const handleImageResolutionReset = useCallback(() => {
    processorChanged(controlNetId, {
      image_resolution: DEFAULTS.image_resolution,
    });
  }, [controlNetId, processorChanged]);

  const handleHandAndFaceChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      processorChanged(controlNetId, { hand_and_face: e.target.checked });
    },
    [controlNetId, processorChanged]
  );

  return (
    <ProcessorWrapper>
      <InvControl
        label={t('controlnet.detectResolution')}
        isDisabled={!isEnabled}
      >
        <InvSlider
          value={detect_resolution}
          onChange={handleDetectResolutionChanged}
          onReset={handleDetectResolutionReset}
          min={0}
          max={4096}
          marks
          withNumberInput
        />
      </InvControl>
      <InvControl
        label={t('controlnet.imageResolution')}
        isDisabled={!isEnabled}
      >
        <InvSlider
          value={image_resolution}
          onChange={handleImageResolutionChanged}
          onReset={handleImageResolutionReset}
          min={0}
          max={4096}
          marks
          withNumberInput
        />
      </InvControl>
      <InvControl label={t('controlnet.handAndFace')} isDisabled={!isEnabled}>
        <InvSwitch
          isChecked={hand_and_face}
          onChange={handleHandAndFaceChanged}
        />
      </InvControl>
    </ProcessorWrapper>
  );
};

export default memo(OpenposeProcessor);
