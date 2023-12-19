import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { InvControl, InvSlider } from 'common/components';
import { setCanvasCoherenceSteps } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const ParamCanvasCoherenceSteps = () => {
  const dispatch = useAppDispatch();
  const canvasCoherenceSteps = useAppSelector(
    (state: RootState) => state.generation.canvasCoherenceSteps
  );
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(setCanvasCoherenceSteps(v));
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(setCanvasCoherenceSteps(20));
  }, [dispatch]);

  return (
    <IAIInformationalPopover feature="compositingCoherenceSteps">
      <InvControl label={t('parameters.coherenceSteps')}>
        <InvSlider
          min={1}
          max={100}
          step={1}
          value={canvasCoherenceSteps}
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

export default memo(ParamCanvasCoherenceSteps);
