import { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import {
  InvControl,
  InvSelect,
  InvSelectOnChange,
  InvSelectOption,
} from 'common/components';
import { setMaskBlurMethod } from 'features/parameters/store/generationSlice';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isParameterMaskBlurMethod } from 'features/parameters/types/parameterSchemas';

const options: InvSelectOption[] = [
  { label: 'Box Blur', value: 'box' },
  { label: 'Gaussian Blur', value: 'gaussian' },
];

export default function ParamMaskBlurMethod() {
  const maskBlurMethod = useAppSelector(
    (state: RootState) => state.generation.maskBlurMethod
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!isParameterMaskBlurMethod(v?.value)) {
        return;
      }
      dispatch(setMaskBlurMethod(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => options.find((o) => o.value === maskBlurMethod),
    [maskBlurMethod]
  );

  return (
    <IAIInformationalPopover feature="compositingBlurMethod">
      <InvControl label={t('parameters.maskBlurMethod')}>
        <InvSelect value={value} onChange={onChange} options={options} />
      </InvControl>
    </IAIInformationalPopover>
  );
}
