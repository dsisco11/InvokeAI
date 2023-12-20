import { Flex } from '@chakra-ui/react';
import { useAppDispatch } from 'app/store/storeHooks';
import {
  InvControl,
  InvSelect,
  useGroupedModelInvSelect,
} from 'common/components';
import SyncModelsButton from 'features/modelManager/subpanels/ModelManagerSettingsPanel/SyncModelsButton';
import { fieldMainModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  MainModelFieldInputInstance,
  MainModelFieldInputTemplate,
} from 'features/nodes/types/field';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { memo, useCallback } from 'react';
import { NON_SDXL_MAIN_MODELS } from 'services/api/constants';
import {
  MainModelConfigEntity,
  useGetMainModelsQuery,
} from 'services/api/endpoints/models';
import { FieldComponentProps } from './types';

type Props = FieldComponentProps<
  MainModelFieldInputInstance,
  MainModelFieldInputTemplate
>;

const MainModelFieldInputComponent = (props: Props) => {
  const { nodeId, field } = props;
  const dispatch = useAppDispatch();
  const isSyncModelEnabled = useFeatureStatus('syncModels').isFeatureEnabled;
  const { data, isLoading } = useGetMainModelsQuery(NON_SDXL_MAIN_MODELS);
  const _onChange = useCallback(
    (value: MainModelConfigEntity | null) => {
      if (!value) {
        return;
      }
      dispatch(
        fieldMainModelValueChanged({
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

export default memo(MainModelFieldInputComponent);
