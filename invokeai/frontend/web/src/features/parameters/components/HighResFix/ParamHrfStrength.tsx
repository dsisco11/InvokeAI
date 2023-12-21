import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSlider } from 'common/components';
import { setHrfStrength } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, config }) => {
    const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
      config.sd.hrfStrength;
    const { hrfStrength, hrfEnabled } = generation;

    return {
      hrfStrength,
      initial,
      min,
      sliderMax,
      inputMax,
      step: coarseStep,
      fineStep,
      hrfEnabled,
    };
  }
);

const ParamHrfStrength = () => {
  const { hrfStrength, initial, min, sliderMax, step, fineStep, hrfEnabled } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleHrfStrengthReset = useCallback(() => {
    dispatch(setHrfStrength(initial));
  }, [dispatch, initial]);

  const handleHrfStrengthChange = useCallback(
    (v: number) => {
      dispatch(setHrfStrength(v));
    },
    [dispatch]
  );

  return (
    <InvControl
      label={t('parameters.denoisingStrength')}
      isDisabled={!hrfEnabled}
    >
      <InvSlider
        min={min}
        max={sliderMax}
        step={step}
        fineStep={fineStep}
        value={hrfStrength}
        onChange={handleHrfStrengthChange}
        marks
        withNumberInput
        onReset={handleHrfStrengthReset}
      />
    </InvControl>
  );
};

export default memo(ParamHrfStrength);
