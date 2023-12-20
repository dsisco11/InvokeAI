import { useAppDispatch } from 'app/store/storeHooks';
import { fieldLoRAModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  LoRAModelFieldInputTemplate,
  LoRAModelFieldInputInstance,
} from 'features/nodes/types/field';
import { FieldComponentProps } from './types';
import { memo, useCallback } from 'react';
import {
  LoRAModelConfigEntity,
  useGetLoRAModelsQuery,
} from 'services/api/endpoints/models';
import { useGroupedModelInvSelect } from 'common/components/InvSelect/useGroupedModelInvSelect';
import { InvControl, InvSelect } from 'common/components';

type Props = FieldComponentProps<
  LoRAModelFieldInputInstance,
  LoRAModelFieldInputTemplate
>;

const LoRAModelFieldInputComponent = (props: Props) => {
  const { nodeId, field } = props;
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetLoRAModelsQuery();
  const _onChange = useCallback(
    (value: LoRAModelConfigEntity | null) => {
      if (!value) {
        return;
      }
      dispatch(
        fieldLoRAModelValueChanged({
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
        ? { ...field.value, model_type: 'lora' }
        : undefined,
      isLoading,
    });

  return (
    <InvControl
      className="nowheel nodrag"
      isInvalid={!value}
      isDisabled={!options.length}
    >
      <InvSelect
        value={value}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
        options={options}
        onChange={onChange}
      />
    </InvControl>
  );
};

export default memo(LoRAModelFieldInputComponent);
