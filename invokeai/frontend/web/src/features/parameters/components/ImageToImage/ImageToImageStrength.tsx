import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { InvControl, InvSlider } from 'common/components';
import { setImg2imgStrength } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, hotkeys, config }) => {
    const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
      config.sd.img2imgStrength;
    const { img2imgStrength } = generation;

    const step = hotkeys.shift ? fineStep : coarseStep;

    return {
      img2imgStrength,
      initial,
      min,
      sliderMax,
      inputMax,
      step,
    };
  }
);

const ImageToImageStrength = () => {
  const { img2imgStrength, initial, min, sliderMax, inputMax, step } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => dispatch(setImg2imgStrength(v)),
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(setImg2imgStrength(initial));
  }, [dispatch, initial]);

  return (
    <IAIInformationalPopover feature="paramDenoisingStrength">
      <InvControl label={`${t('parameters.denoisingStrength')}`}>
        <InvSlider
          step={step}
          min={min}
          max={sliderMax}
          onChange={handleChange}
          onReset={handleReset}
          value={img2imgStrength}
          marks
          numberInputMax={inputMax}
        />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ImageToImageStrength);
