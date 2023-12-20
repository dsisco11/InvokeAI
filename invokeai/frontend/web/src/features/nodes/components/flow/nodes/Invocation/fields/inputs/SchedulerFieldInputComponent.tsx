import { useAppDispatch } from 'app/store/storeHooks';
import IAIMantineSearchableSelect from 'common/components/IAIMantineSearchableSelect';
import { fieldSchedulerValueChanged } from 'features/nodes/store/nodesSlice';
import {
  SchedulerFieldInputInstance,
  SchedulerFieldInputTemplate,
} from 'features/nodes/types/field';
import { SCHEDULER_LABEL_MAP } from 'features/parameters/types/constants';
import { ParameterScheduler } from 'features/parameters/types/parameterSchemas';
import { map } from 'lodash-es';
import { memo, useCallback } from 'react';
import { FieldComponentProps } from './types';

const data = map(SCHEDULER_LABEL_MAP, (label, name) => ({
  value: name,
  label: label,
})).sort((a, b) => a.label.localeCompare(b.label));

const SchedulerFieldInputComponent = (
  props: FieldComponentProps<
    SchedulerFieldInputInstance,
    SchedulerFieldInputTemplate
  >
) => {
  const { nodeId, field } = props;
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (value: string | null) => {
      if (!value) {
        return;
      }
      dispatch(
        fieldSchedulerValueChanged({
          nodeId,
          fieldName: field.name,
          value: value as ParameterScheduler,
        })
      );
    },
    [dispatch, field.name, nodeId]
  );

  return (
    <IAIMantineSearchableSelect
      className="nowheel nodrag"
      value={field.value}
      data={data}
      onChange={handleChange}
    />
  );
};

export default memo(SchedulerFieldInputComponent);
