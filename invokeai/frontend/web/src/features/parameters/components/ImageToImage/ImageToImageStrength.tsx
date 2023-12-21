import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl } from 'common/components/InvControl/InvControl';
import { InvSlider } from 'common/components/InvSlider/InvSlider';
import { setImg2imgStrength } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, config }) => {
    const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
      config.sd.img2imgStrength;
    const { img2imgStrength } = generation;

    return {
      img2imgStrength,
      initial,
      min,
      sliderMax,
      inputMax,
      step: coarseStep,
      fineStep,
    };
  }
);

const ImageToImageStrength = () => {
  const { img2imgStrength, initial, min, sliderMax, inputMax, step, fineStep } =
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
    <InvControl
      label={`${t('parameters.denoisingStrength')}`}
      feature="paramDenoisingStrength"
    >
      <InvSlider
        step={step}
        fineStep={fineStep}
        min={min}
        max={sliderMax}
        onChange={handleChange}
        onReset={handleReset}
        value={img2imgStrength}
        marks
        numberInputMax={inputMax}
      />
    </InvControl>
  );
};

export default memo(ImageToImageStrength);
