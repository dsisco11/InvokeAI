import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvNumberInput } from 'common/components';
import { setCfgScale } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, config }) => {
    const { min, inputMax } = config.sd.guidance;
    const { cfgScale } = generation;

    return {
      cfgScale,
      min,
      inputMax,
    };
  }
);

const ParamCFGScale = () => {
  const { cfgScale, min, inputMax } = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => dispatch(setCfgScale(v)),
    [dispatch]
  );

  return (
    <InvControl label={t('parameters.cfgScale')} feature="paramCFGScale">
      <InvNumberInput
        value={cfgScale}
        step={0.5}
        fineStep={0.1}
        min={min}
        max={inputMax}
        onChange={handleChange}
      />
    </InvControl>
  );
};

export default memo(ParamCFGScale);
