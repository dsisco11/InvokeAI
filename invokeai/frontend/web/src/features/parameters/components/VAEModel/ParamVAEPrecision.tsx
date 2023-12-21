import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import type { InvSelectOnChange } from 'common/components';
import { InvControl, InvSelect } from 'common/components';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { vaePrecisionChanged } from 'features/parameters/store/generationSlice';
import { isParameterPrecision } from 'features/parameters/types/parameterSchemas';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const options = [
  { label: 'FP16', value: 'fp16' },
  { label: 'FP32', value: 'fp32' },
];

const ParamVAEModelSelect = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const vaePrecision = useAppSelector((state) => state.generation.vaePrecision);

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!isParameterPrecision(v?.value)) {
        return;
      }

      dispatch(vaePrecisionChanged(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => options.find((o) => o.value === vaePrecision),
    [vaePrecision]
  );

  return (
    <IAIInformationalPopover feature="paramVAEPrecision">
      <InvControl label={t('modelManager.vaePrecision')}>
        <InvSelect value={value} options={options} onChange={onChange} />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ParamVAEModelSelect);
