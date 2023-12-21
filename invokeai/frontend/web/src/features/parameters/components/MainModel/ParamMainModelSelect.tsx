import { Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import {
  InvControl,
  InvSelect,
  useGroupedModelInvSelect,
} from 'common/components';
import SyncModelsButton from 'features/modelManager/subpanels/ModelManagerSettingsPanel/SyncModelsButton';
import { modelSelected } from 'features/parameters/store/actions';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { pick } from 'lodash-es';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NON_REFINER_BASE_MODELS } from 'services/api/constants';
import type { MainModelConfigEntity } from 'services/api/endpoints/models';
import { useGetMainModelsQuery } from 'services/api/endpoints/models';

const selector = createMemoizedSelector(stateSelector, (state) => ({
  model: state.generation.model,
}));

const ParamMainModelSelect = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { model } = useAppSelector(selector);

  const isSyncModelEnabled = useFeatureStatus('syncModels').isFeatureEnabled;
  const { data, isLoading } = useGetMainModelsQuery(NON_REFINER_BASE_MODELS);

  const _onChange = useCallback(
    (model: MainModelConfigEntity | null) => {
      if (!model) {
        return;
      }
      dispatch(
        modelSelected(pick(model, ['base_model', 'model_name', 'model_type']))
      );
    },
    [dispatch]
  );
  const { options, value, onChange, placeholder, noOptionsMessage } =
    useGroupedModelInvSelect({
      modelEntities: data,
      onChange: _onChange,
      selectedModel: model,
      isLoading,
    });

  return (
    <Flex w="100%" alignItems="center" gap={2}>
      <InvControl
        label={t('modelManager.model')}
        isDisabled={!options.length}
        isInvalid={!options.length}
      >
        <InvSelect
          value={value}
          placeholder={placeholder}
          options={options}
          onChange={onChange}
          noOptionsMessage={noOptionsMessage}
        />
      </InvControl>
      {isSyncModelEnabled && <SyncModelsButton iconMode />}
    </Flex>
  );
};

export default memo(ParamMainModelSelect);
