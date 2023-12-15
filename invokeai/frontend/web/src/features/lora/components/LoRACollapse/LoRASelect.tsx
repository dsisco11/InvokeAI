import { Flex, Text } from '@chakra-ui/react';
import { useAppDispatch } from 'app/store/storeHooks';
import { SingleValue } from 'chakra-react-select';
import { InvControl, InvSelect, InvSelectOption } from 'common/components/';
import { useLoRASelectOptions } from 'features/lora/components/LoRACollapse/useLoRASelectOptions';
import { loraAdded } from 'features/lora/store/loraSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLoRAModelsQuery } from 'services/api/endpoints/models';

const noOptionsMessage = () => 'No matching LoRAs';

const LoRASelect = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetLoRAModelsQuery();
  const { t } = useTranslation();
  const options = useLoRASelectOptions();
  const onChange = useCallback(
    (v: SingleValue<InvSelectOption>) => {
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

  if (options.length === 0) {
    return (
      <Flex sx={{ justifyContent: 'center', p: 2 }}>
        <Text sx={{ fontSize: 'sm', color: 'base.500', _dark: 'base.700' }}>
          {t('models.noLoRAsInstalled')}
        </Text>
      </Flex>
    );
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
