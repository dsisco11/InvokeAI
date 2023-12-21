import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import type { InvSelectOnChange, InvSelectOption } from 'common/components';
import { InvControl, InvSelect } from 'common/components';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { setCanvasCoherenceMode } from 'features/parameters/store/generationSlice';
import { isParameterCanvasCoherenceMode } from 'features/parameters/types/parameterSchemas';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ParamCanvasCoherenceMode = () => {
  const dispatch = useAppDispatch();
  const canvasCoherenceMode = useAppSelector(
    (state: RootState) => state.generation.canvasCoherenceMode
  );
  const { t } = useTranslation();

  const options = useMemo<InvSelectOption[]>(
    () => [
      { label: t('parameters.unmasked'), value: 'unmasked' },
      { label: t('unifiedCanvas.mask'), value: 'mask' },
      { label: t('parameters.maskEdge'), value: 'edge' },
    ],
    [t]
  );

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!isParameterCanvasCoherenceMode(v?.value)) {
        return;
      }

      dispatch(setCanvasCoherenceMode(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => options.find((o) => o.value === canvasCoherenceMode),
    [canvasCoherenceMode, options]
  );

  return (
    <IAIInformationalPopover feature="compositingCoherenceMode">
      <InvControl label={t('parameters.coherenceMode')}>
        <InvSelect options={options} value={value} onChange={onChange} />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ParamCanvasCoherenceMode);
