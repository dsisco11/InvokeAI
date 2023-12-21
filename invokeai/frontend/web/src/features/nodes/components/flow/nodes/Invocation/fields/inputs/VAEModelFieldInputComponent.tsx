import { Flex } from '@chakra-ui/layout';
import { useAppDispatch } from 'app/store/storeHooks';
import { InvControl } from 'common/components/InvControl/InvControl';
import { InvSelect } from 'common/components/InvSelect/InvSelect';
import { useGroupedModelInvSelect } from 'common/components/InvSelect/useGroupedModelInvSelect';
import SyncModelsButton from 'features/modelManager/subpanels/ModelManagerSettingsPanel/SyncModelsButton';
import { fieldVaeModelValueChanged } from 'features/nodes/store/nodesSlice';
import type {
  VAEModelFieldInputInstance,
  VAEModelFieldInputTemplate,
} from 'features/nodes/types/field';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { memo, useCallback } from 'react';
import type { VaeModelConfigEntity } from 'services/api/endpoints/models';
import { useGetVaeModelsQuery } from 'services/api/endpoints/models';

import type { FieldComponentProps } from './types';

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
