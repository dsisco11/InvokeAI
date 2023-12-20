import { useAppDispatch } from 'app/store/storeHooks';
import { fieldIPAdapterModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  IPAdapterModelFieldInputTemplate,
  IPAdapterModelFieldInputInstance,
} from 'features/nodes/types/field';
import { FieldComponentProps } from './types';
import { groupBy, reduce } from 'lodash-es';
import {
  InvControl,
  InvSelect,
  InvSelectOnChange,
  InvSelectOption,
  InvTooltip,
} from 'common/components';
import { memo, useCallback, useMemo } from 'react';
import {
  ipAdapterModelsAdapter,
  useGetIPAdapterModelsQuery,
} from 'services/api/endpoints/models';
import { GroupBase } from 'chakra-react-select';

const selectAll = ipAdapterModelsAdapter.getSelectors().selectAll;

const IPAdapterModelFieldInputComponent = (
  props: FieldComponentProps<
    IPAdapterModelFieldInputInstance,
    IPAdapterModelFieldInputTemplate
  >
) => {
  const { nodeId, field } = props;
  const ipAdapterModel = field.value;
  const dispatch = useAppDispatch();

  const { data: ipAdapterModels } = useGetIPAdapterModelsQuery();
  const ipAdapterModelsArray = useMemo(
    () => (ipAdapterModels ? selectAll(ipAdapterModels) : []),
    [ipAdapterModels]
  );
  // grab the full model entity from the RTK Query cache
  const selectedModel = useMemo(
    () =>
      ipAdapterModels?.entities[
        `${ipAdapterModel?.base_model}/ip_adapter/${ipAdapterModel?.model_name}`
      ] ?? null,
    [
      ipAdapterModel?.base_model,
      ipAdapterModel?.model_name,
      ipAdapterModels?.entities,
    ]
  );

  const options = useMemo<GroupBase<InvSelectOption>[]>(() => {
    return reduce(
      groupBy(ipAdapterModelsArray, (m) => m.base_model),
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
  }, [ipAdapterModelsArray]);

  const handleValueChanged = useCallback<InvSelectOnChange>(
    (v) => {
      if (!v) {
        return;
      }
      const modelEntity = ipAdapterModels?.entities[v.value];

      if (!modelEntity) {
        return;
      }

      dispatch(
        fieldIPAdapterModelValueChanged({
          nodeId,
          fieldName: field.name,
          value: modelEntity,
        })
      );
    },
    [dispatch, field.name, ipAdapterModels?.entities, nodeId]
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

export default memo(IPAdapterModelFieldInputComponent);
