import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { InvControl, InvSlider } from 'common/components';
import { setCanvasCoherenceStrength } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const ParamCanvasCoherenceStrength = () => {
  const dispatch = useAppDispatch();
  const canvasCoherenceStrength = useAppSelector(
    (state: RootState) => state.generation.canvasCoherenceStrength
  );
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(setCanvasCoherenceStrength(v));
    },
    [dispatch]
  );
  const handleReset = useCallback(() => {
    dispatch(setCanvasCoherenceStrength(0.3));
  }, [dispatch]);

  return (
    <IAIInformationalPopover feature="compositingStrength">
      <InvControl label={t('parameters.coherenceStrength')}>
        <InvSlider
          min={0}
          max={1}
          step={0.01}
          value={canvasCoherenceStrength}
          onChange={handleChange}
          onReset={handleReset}
          withNumberInput
          numberInputMax={999}
          marks
        />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ParamCanvasCoherenceStrength);
