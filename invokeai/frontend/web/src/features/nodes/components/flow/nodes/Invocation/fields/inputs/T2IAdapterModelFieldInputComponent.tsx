import { useAppDispatch } from 'app/store/storeHooks';
import { GroupBase } from 'chakra-react-select';
import {
  InvControl,
  InvSelect,
  InvSelectOnChange,
  InvSelectOption,
  InvTooltip,
} from 'common/components';
import { fieldT2IAdapterModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  T2IAdapterModelFieldInputInstance,
  T2IAdapterModelFieldInputTemplate,
} from 'features/nodes/types/field';
import { groupBy, reduce } from 'lodash-es';
import { memo, useCallback, useMemo } from 'react';
import {
  t2iAdapterModelsAdapter,
  useGetT2IAdapterModelsQuery,
} from 'services/api/endpoints/models';
import { FieldComponentProps } from './types';
const selectAll = t2iAdapterModelsAdapter.getSelectors().selectAll;

const T2IAdapterModelFieldInputComponent = (
  props: FieldComponentProps<
    T2IAdapterModelFieldInputInstance,
    T2IAdapterModelFieldInputTemplate
  >
) => {
  const { nodeId, field } = props;
  const t2iAdapterModel = field.value;
  const dispatch = useAppDispatch();

  const { data: t2iAdapterModels } = useGetT2IAdapterModelsQuery();
  const t2iAdapterModelsArray = useMemo(
    () => (t2iAdapterModels ? selectAll(t2iAdapterModels) : []),
    [t2iAdapterModels]
  );

  // grab the full model entity from the RTK Query cache
  const selectedModel = useMemo(
    () =>
      t2iAdapterModels?.entities[
        `${t2iAdapterModel?.base_model}/t2i_adapter/${t2iAdapterModel?.model_name}`
      ] ?? null,
    [
      t2iAdapterModel?.base_model,
      t2iAdapterModel?.model_name,
      t2iAdapterModels?.entities,
    ]
  );

  const options = useMemo<GroupBase<InvSelectOption>[]>(() => {
    const _options = reduce(
      groupBy(t2iAdapterModelsArray, (m) => m.base_model),
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
  }, [t2iAdapterModelsArray]);

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!v) {
        return;
      }

      const modelEntity = t2iAdapterModels?.entities[v.value];

      if (!modelEntity) {
        return;
      }

      dispatch(
        fieldT2IAdapterModelValueChanged({
          nodeId,
          fieldName: field.name,
          value: modelEntity,
        })
      );
    },
    [t2iAdapterModels?.entities, dispatch, field.name, nodeId]
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
          onChange={onChange}
          sx={{ width: '100%' }}
        />
      </InvControl>
    </InvTooltip>
  );
};

export default memo(T2IAdapterModelFieldInputComponent);
