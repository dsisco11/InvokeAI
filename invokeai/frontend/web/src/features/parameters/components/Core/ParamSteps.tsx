import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import IAINumberInput from 'common/components/IAINumberInput';
import {
  clampSymmetrySteps,
  setSteps,
} from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, config, hotkeys }) => {
    const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
      config.sd.steps;
    const { steps } = generation;

    const step = hotkeys.shift ? fineStep : coarseStep;

    return {
      steps,
      initial,
      min,
      sliderMax,
      inputMax,
      step,
    };
  }
);

const ParamSteps = () => {
  const { steps, initial, min, sliderMax, inputMax, step } =
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
    <IAIInformationalPopover feature="paramSteps">
      <IAINumberInput
        label={t('parameters.steps')}
        min={min}
        max={inputMax}
        step={step}
        onChange={handleChange}
        value={steps}
        numberInputFieldProps={{ textAlign: 'center' }}
        onBlur={handleBlur}
      />
    </IAIInformationalPopover>
  );
};

export default memo(ParamSteps);
