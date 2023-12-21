import { Flex } from '@chakra-ui/react';
import { useAppDispatch } from 'app/store/storeHooks';
import { InvControl, InvSelect } from 'common/components';
import { useGroupedModelInvSelect } from 'common/components/InvSelect/useGroupedModelInvSelect';
import SyncModelsButton from 'features/modelManager/subpanels/ModelManagerSettingsPanel/SyncModelsButton';
import { fieldRefinerModelValueChanged } from 'features/nodes/store/nodesSlice';
import type {
  SDXLRefinerModelFieldInputInstance,
  SDXLRefinerModelFieldInputTemplate,
} from 'features/nodes/types/field';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { memo, useCallback } from 'react';
import { REFINER_BASE_MODELS } from 'services/api/constants';
import type { MainModelConfigEntity } from 'services/api/endpoints/models';
import { useGetMainModelsQuery } from 'services/api/endpoints/models';

import type { FieldComponentProps } from './types';

type Props = FieldComponentProps<
  SDXLRefinerModelFieldInputInstance,
  SDXLRefinerModelFieldInputTemplate
>;

const RefinerModelFieldInputComponent = (props: Props) => {
  const { nodeId, field } = props;
  const dispatch = useAppDispatch();
  const isSyncModelEnabled = useFeatureStatus('syncModels').isFeatureEnabled;
  const { data, isLoading } = useGetMainModelsQuery(REFINER_BASE_MODELS);
  const _onChange = useCallback(
    (value: MainModelConfigEntity | null) => {
      if (!value) {
        return;
      }
      dispatch(
        fieldRefinerModelValueChanged({
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

export default memo(RefinerModelFieldInputComponent);
