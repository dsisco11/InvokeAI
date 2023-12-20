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
import { refinerModelChanged } from 'features/sdxl/store/sdxlSlice';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { REFINER_BASE_MODELS } from 'services/api/constants';
import {
  MainModelConfigEntity,
  useGetMainModelsQuery,
} from 'services/api/endpoints/models';

const selector = createMemoizedSelector(stateSelector, (state) => ({
  model: state.sdxl.refinerModel,
}));

const ParamSDXLRefinerModelSelect = () => {
  const dispatch = useAppDispatch();
  const isSyncModelEnabled = useFeatureStatus('syncModels').isFeatureEnabled;
  const { model } = useAppSelector(selector);
  const { t } = useTranslation();
  const { data, isLoading } = useGetMainModelsQuery(REFINER_BASE_MODELS);
  const _onChange = useCallback(
    (model: MainModelConfigEntity | null) => {
      if (!model) {
        return;
      }
      dispatch(
        refinerModelChanged({
          base_model: 'sdxl-refiner',
          model_name: model.model_name,
          model_type: model.model_type,
        })
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
        label={t('sdxl.refinermodel')}
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

export default memo(ParamSDXLRefinerModelSelect);
