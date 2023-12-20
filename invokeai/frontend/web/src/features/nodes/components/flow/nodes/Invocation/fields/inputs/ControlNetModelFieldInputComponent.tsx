import { useAppDispatch } from 'app/store/storeHooks';
import { InvControl, InvSelect, InvTooltip } from 'common/components';
import { useGroupedModelInvSelect } from 'common/components/InvSelect/useGroupedModelInvSelect';
import { fieldControlNetModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  ControlNetModelFieldInputInstance,
  ControlNetModelFieldInputTemplate,
} from 'features/nodes/types/field';
import { memo, useCallback } from 'react';
import {
  ControlNetModelConfigEntity,
  useGetControlNetModelsQuery,
} from 'services/api/endpoints/models';
import { FieldComponentProps } from './types';

type Props = FieldComponentProps<
  ControlNetModelFieldInputInstance,
  ControlNetModelFieldInputTemplate
>;

const ControlNetModelFieldInputComponent = (props: Props) => {
  const { nodeId, field } = props;
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetControlNetModelsQuery();

  const _onChange = useCallback(
    (value: ControlNetModelConfigEntity | null) => {
      if (!value) {
        return;
      }
      dispatch(
        fieldControlNetModelValueChanged({
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
      selectedModel: field.value
        ? { ...field.value, model_type: 'controlnet' }
        : undefined,
      isLoading,
    });

  return (
    <InvTooltip label={value?.description}>
      <InvControl className="nowheel nodrag" isInvalid={!value}>
        <InvSelect
          value={value}
          placeholder={placeholder}
          options={options}
          onChange={onChange}
          noOptionsMessage={noOptionsMessage}
        />
      </InvControl>
    </InvTooltip>
  );
};

export default memo(ControlNetModelFieldInputComponent);
