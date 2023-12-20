import { useAppDispatch } from 'app/store/storeHooks';
import { fieldControlNetModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  ControlNetModelFieldInputTemplate,
  ControlNetModelFieldInputInstance,
} from 'features/nodes/types/field';
import { FieldComponentProps } from './types';
import { groupBy, reduce } from 'lodash-es';
import { memo, useCallback, useMemo } from 'react';
import {
  controlNetModelsAdapter,
  useGetControlNetModelsQuery,
} from 'services/api/endpoints/models';
import {
  InvControl,
  InvSelect,
  InvSelectOnChange,
  InvSelectOption,
  InvTooltip,
} from 'common/components';
import { GroupBase } from 'chakra-react-select';

const selectAll = controlNetModelsAdapter.getSelectors().selectAll;

const ControlNetModelFieldInputComponent = (
  props: FieldComponentProps<
    ControlNetModelFieldInputInstance,
    ControlNetModelFieldInputTemplate
  >
) => {
  const { nodeId, field } = props;
  const controlNetModel = field.value;
  const dispatch = useAppDispatch();

  const { data: controlNetModels } = useGetControlNetModelsQuery();
  const controlNetModelsArray = useMemo(
    () => (controlNetModels ? selectAll(controlNetModels) : []),
    [controlNetModels]
  );
  // grab the full model entity from the RTK Query cache
  const selectedModel = useMemo(
    () =>
      controlNetModels?.entities[
        `${controlNetModel?.base_model}/controlnet/${controlNetModel?.model_name}`
      ] ?? null,
    [
      controlNetModel?.base_model,
      controlNetModel?.model_name,
      controlNetModels?.entities,
    ]
  );

  const options = useMemo<GroupBase<InvSelectOption>[]>(() => {
    const _options = reduce(
      groupBy(controlNetModelsArray, (m) => m.base_model),
      (acc, val, label) => {
        acc.push({
          label,
          options: val.map((v) => ({
            value: v.id,
            label: v.model_name,
          })),
        });
        return acc;
      },
      [] as GroupBase<InvSelectOption>[]
    );

    return _options;
  }, [controlNetModelsArray]);

  const handleValueChanged = useCallback<InvSelectOnChange>(
    (v) => {
      if (!v) {
        return;
      }

      const modelEntity = controlNetModels?.entities[v.value];

      if (!modelEntity) {
        return;
      }

      dispatch(
        fieldControlNetModelValueChanged({
          nodeId,
          fieldName: field.name,
          value: modelEntity,
        })
      );
    },
    [controlNetModels?.entities, dispatch, field.name, nodeId]
  );

  const value = useMemo(
    () =>
      options
        .flatMap((o) => o.options)
        .find((m) => m.value === selectedModel?.id),
    [options, selectedModel?.id]
  );

  return (
    <InvTooltip label={selectedModel?.description}>
      <InvControl className="nowheel nodrag" isInvalid={!selectedModel}>
        <InvSelect
          value={value}
          placeholder="Pick one"
          options={options}
          onChange={handleValueChanged}
          sx={{ width: '100%' }}
        />
      </InvControl>
    </InvTooltip>
  );
};

export default memo(ControlNetModelFieldInputComponent);
