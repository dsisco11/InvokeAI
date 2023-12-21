import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvNumberInput } from 'common/components';
import {
  clampSymmetrySteps,
  setSteps,
} from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, config }) => {
    const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
      config.sd.steps;
    const { steps } = generation;

    return {
      steps,
      initial,
      min,
      sliderMax,
      inputMax,
      step: coarseStep,
      fineStep,
    };
  }
);

const ParamSteps = () => {
  const { steps, initial, min, sliderMax, inputMax, step, fineStep } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(setSteps(v));
    },
    [dispatch]
  );

  const handleBlur = useCallback(() => {
    dispatch(clampSymmetrySteps());
  }, [dispatch]);

  return (
    <InvControl label={t('parameters.steps')} feature="paramSteps">
      <InvNumberInput
        min={min}
        max={inputMax}
        step={step}
        fineStep={fineStep}
        onChange={handleChange}
        value={steps}
        onBlur={handleBlur}
      />
    </InvControl>
  );
};

export default memo(ParamSteps);
