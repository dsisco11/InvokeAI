import { useAppDispatch } from 'app/store/storeHooks';
import { fieldColorValueChanged } from 'features/nodes/store/nodesSlice';
import type {
  ColorFieldInputTemplate,
  ColorFieldInputInstance,
} from 'features/nodes/types/field';
import type { FieldComponentProps } from './types';
import { memo, useCallback } from 'react';
import type { RgbaColor } from 'react-colorful';
import { RgbaColorPicker } from 'react-colorful';

const ColorFieldInputComponent = (
  props: FieldComponentProps<ColorFieldInputInstance, ColorFieldInputTemplate>
) => {
  const { nodeId, field } = props;

  const dispatch = useAppDispatch();

  const handleValueChanged = useCallback(
    (value: RgbaColor) => {
      dispatch(
        fieldColorValueChanged({
          nodeId,
          fieldName: field.name,
          value,
        })
      );
    },
    [dispatch, field.name, nodeId]
  );

  return (
    <RgbaColorPicker
      className="nodrag"
      color={field.value}
      onChange={handleValueChanged}
    />
  );
};

export default memo(ColorFieldInputComponent);
