import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import {
  InvControl,
  InvSelect,
  InvSelectOnChange,
  InvSelectOption,
} from 'common/components';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { setBoundingBoxScaleMethod } from 'features/canvas/store/canvasSlice';
import { isBoundingBoxScaleMethod } from 'features/canvas/store/canvasTypes';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const OPTIONS: InvSelectOption[] = [
  { label: 'None', value: 'none' },
  { label: 'Auto', value: 'auto' },
  { label: 'Manual', value: 'manual' },
];

const ParamScaleBeforeProcessing = () => {
  const dispatch = useAppDispatch();
  const boundingBoxScaleMethod = useAppSelector(
    (state) => state.canvas.boundingBoxScaleMethod
  );

  const { t } = useTranslation();

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!isBoundingBoxScaleMethod(v?.value)) {
        return;
      }
      dispatch(setBoundingBoxScaleMethod(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => OPTIONS.find((o) => o.value === boundingBoxScaleMethod),
    [boundingBoxScaleMethod]
  );

  return (
    <IAIInformationalPopover feature="scaleBeforeProcessing">
      <InvControl label={t('parameters.scaleBeforeProcessing')}>
        <InvSelect value={value} options={OPTIONS} onChange={onChange} />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ParamScaleBeforeProcessing);
