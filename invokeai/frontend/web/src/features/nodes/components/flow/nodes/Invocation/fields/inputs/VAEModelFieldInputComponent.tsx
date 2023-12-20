import { Flex } from '@chakra-ui/layout';
import { useAppDispatch } from 'app/store/storeHooks';
import {
  InvControl,
  InvSelect,
  useGroupedModelInvSelect,
} from 'common/components';
import SyncModelsButton from 'features/modelManager/subpanels/ModelManagerSettingsPanel/SyncModelsButton';
import { fieldVaeModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  VAEModelFieldInputInstance,
  VAEModelFieldInputTemplate,
} from 'features/nodes/types/field';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { memo, useCallback } from 'react';
import {
  VaeModelConfigEntity,
  useGetVaeModelsQuery,
} from 'services/api/endpoints/models';
import { FieldComponentProps } from './types';

type Props = FieldComponentProps<
  VAEModelFieldInputInstance,
  VAEModelFieldInputTemplate
>;

const VAEModelFieldInputComponent = (props: Props) => {
  const { nodeId, field } = props;
  const isSyncModelEnabled = useFeatureStatus('syncModels').isFeatureEnabled;
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetVaeModelsQuery();
  const _onChange = useCallback(
    (value: VaeModelConfigEntity | null) => {
      if (!value) {
        return;
      }
      dispatch(
        fieldVaeModelValueChanged({
          nodeId,
          fieldName: field.name,
          value,
        })
      );
    },
    [dispatch, field.name, nodeId]
  );
  const { options, value, onChange, placeholder, noOptionsMessage } =
    useGroupedModelInvSelect({
      modelEntities: data,
      onChange: _onChange,
      selectedModel: field.value ? { ...field.value, model_type: 'vae' } : null,
      isLoading,
    });

  return (
    <Flex sx={{ w: 'full', alignItems: 'center', gap: 2 }}>
      <InvControl
        className="nowheel nodrag"
        isDisabled={!options.length}
        isInvalid={!value}
      >
        <InvSelect
          value={value}
          placeholder={placeholder}
          options={options}
          onChange={onChange}
          noOptionsMessage={noOptionsMessage}
        />
      </InvControl>
      {isSyncModelEnabled && <SyncModelsButton className="nodrag" iconMode />}
    </Flex>
  );
};

export default memo(VAEModelFieldInputComponent);
