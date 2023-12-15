import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { getInputFilledStyles } from 'theme_/util/getInputFilledStyles';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const filled = definePartsStyle(() => {
  return {
    field: getInputFilledStyles(),
  };
});

export const inputTheme = defineMultiStyleConfig({
  variants: {
    filled,
  },
  defaultProps: {
    size: 'sm',
    variant: 'filled',
  },
});
