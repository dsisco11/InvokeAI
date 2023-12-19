import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import IAINumberInput from 'common/components/IAINumberInput';
import { setCfgScale } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, config, ui, hotkeys }) => {
    const { initial, min, sliderMax, inputMax } = config.sd.guidance;
    const { cfgScale } = generation;
    const { shift } = hotkeys;

    return {
      cfgScale,
      initial,
      min,
      sliderMax,
      inputMax,
      shift,
    };
  }
);

const ParamCFGScale = () => {
  const { cfgScale, initial, min, sliderMax, inputMax, shift } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => dispatch(setCfgScale(v)),
    [dispatch]
  );

  const handleReset = useCallback(
    () => dispatch(setCfgScale(initial)),
    [dispatch, initial]
  );

  return (
    <IAIInformationalPopover feature="paramCFGScale">
      <IAINumberInput
        label={t('parameters.cfgScale')}
        step={0.5}
        min={min}
        max={inputMax}
        onChange={handleChange}
        value={cfgScale}
        isInteger={false}
        numberInputFieldProps={{ textAlign: 'center' }}
      />
    </IAIInformationalPopover>
  );
};

export default memo(ParamCFGScale);
