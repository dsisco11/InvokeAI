import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import {
  InvControl,
  InvSelect,
  InvSelectOnChange,
  InvSelectOption,
} from 'common/components';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { setInfillMethod } from 'features/parameters/store/generationSlice';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAppConfigQuery } from 'services/api/endpoints/appInfo';

const ParamInfillMethod = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infillMethod = useAppSelector((state) => state.generation.infillMethod);
  const { data: appConfigData } = useGetAppConfigQuery();
  const options = useMemo<InvSelectOption[]>(
    () =>
      appConfigData
        ? appConfigData.infill_methods.map((method) => ({
            label: method,
            value: method,
          }))
        : [],
    [appConfigData]
  );

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!v || !options.find((o) => o.value === v.value)) {
        return;
      }
      dispatch(setInfillMethod(v.value));
    },
    [dispatch, options]
  );

  const value = useMemo(
    () => options.find((o) => o.value === infillMethod),
    [options, infillMethod]
  );

  return (
    <IAIInformationalPopover feature="infillMethod">
      <InvControl
        label={t('parameters.infillMethod')}
        isDisabled={options.length === 0}
      >
        <InvSelect value={value} options={options} onChange={onChange} />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ParamInfillMethod);
