import { useAppDispatch } from 'app/store/storeHooks';
import { fieldNumberValueChanged } from 'features/nodes/store/nodesSlice';
import type {
  FloatFieldInputInstance,
  FloatFieldInputTemplate,
  IntegerFieldInputInstance,
  IntegerFieldInputTemplate,
} from 'features/nodes/types/field';
import type { FieldComponentProps } from './types';
import { memo, useCallback, useMemo } from 'react';
import { InvNumberInput } from 'common/components';
import { isNil } from 'lodash-es';

const NumberFieldInputComponent = (
  props: FieldComponentProps<
    IntegerFieldInputInstance | FloatFieldInputInstance,
    IntegerFieldInputTemplate | FloatFieldInputTemplate
  >
) => {
  const { nodeId, field, fieldTemplate } = props;
  const dispatch = useAppDispatch();
  const isIntegerField = useMemo(
    () => fieldTemplate.type.name === 'IntegerField',
    [fieldTemplate.type]
  );

  const handleValueChanged = useCallback(
    (v: number) => {
      dispatch(
        fieldNumberValueChanged({
          nodeId,
          fieldName: field.name,
          value: isIntegerField ? Math.floor(Number(v)) : Number(v),
        })
      );
    },
    [dispatch, field.name, isIntegerField, nodeId]
  );

  const min = useMemo(() => {
    if (!isNil(fieldTemplate.minimum)) {
      return fieldTemplate.minimum;
    }
    if (!isNil(fieldTemplate.exclusiveMinimum)) {
      return fieldTemplate.exclusiveMinimum + 0.01;
    }
    return;
  }, [fieldTemplate.exclusiveMinimum, fieldTemplate.minimum]);

  const max = useMemo(() => {
    if (!isNil(fieldTemplate.maximum)) {
      return fieldTemplate.maximum;
    }
    if (!isNil(fieldTemplate.exclusiveMaximum)) {
      return fieldTemplate.exclusiveMaximum - 0.01;
    }
    return;
  }, [fieldTemplate.exclusiveMaximum, fieldTemplate.maximum]);

  return (
    <InvNumberInput
      onChange={handleValueChanged}
      value={field.value}
      min={min}
      max={max}
      step={isIntegerField ? 1 : 0.1}
      className="nodrag"
    />
  );
};

export default memo(NumberFieldInputComponent);
