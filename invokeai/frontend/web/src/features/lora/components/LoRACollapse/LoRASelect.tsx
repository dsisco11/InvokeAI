import { useAppDispatch } from 'app/store/storeHooks';
import {
  InvControl,
  InvSelect,
  InvSelectFallback,
  InvSelectOnChange,
} from 'common/components/';
import { useLoRASelectOptions } from 'features/lora/components/LoRACollapse/useLoRASelectOptions';
import { loraAdded } from 'features/lora/store/loraSlice';
import { t } from 'i18next';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLoRAModelsQuery } from 'services/api/endpoints/models';

const noOptionsMessage = () => t('models.noMatchingLoRAs');

const LoRASelect = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetLoRAModelsQuery();
  const { t } = useTranslation();
  const { options, isLoading } = useLoRASelectOptions();
  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!v) {
        return;
      }
      const loraEntity = data?.entities[v.value];
      if (!loraEntity) {
        return;
      }
      dispatch(loraAdded(loraEntity));
    },
    [dispatch, data?.entities]
  );

  if (isLoading) {
    return <InvSelectFallback label={t('common.loading')} />;
  }

  if (options.length === 0) {
    return <InvSelectFallback label={t('models.noLoRAsInstalled')} />;
  }

  return (
    <InvControl label={t('models.lora')} isDisabled={!options.length}>
      <InvSelect
        placeholder={
          options.length === 0 ? t('models.allLoRAsAdded') : t('models.addLora')
        }
        value={null}
        options={options}
        noOptionsMessage={noOptionsMessage}
        onChange={onChange}
        data-testid="add-lora"
        sx={{ w: 'full' }}
      />
    </InvControl>
  );
};

export default memo(LoRASelect);
