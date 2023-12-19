import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import IAINumberInput from 'common/components/IAINumberInput';
import { setIterations } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector([stateSelector], (state) => {
  const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
    state.config.sd.iterations;
  const { iterations } = state.generation;

  const step = state.hotkeys.shift ? fineStep : coarseStep;

  return {
    iterations,
    initial,
    min,
    sliderMax,
    inputMax,
    step,
  };
});

type Props = {
  asSlider?: boolean;
};

const ParamIterations = ({ asSlider }: Props) => {
  const { iterations, initial, min, sliderMax, inputMax, step } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(setIterations(v));
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(setIterations(initial));
  }, [dispatch, initial]);

  return (
    <IAIInformationalPopover feature="paramIterations">
      <IAINumberInput
        label={t('parameters.iterations')}
        step={step}
        min={min}
        max={inputMax}
        onChange={handleChange}
        value={iterations}
        numberInputFieldProps={{ textAlign: 'center' }}
      />
    </IAIInformationalPopover>
  );
};

export default memo(ParamIterations);
