import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { getInputFilledStyles } from 'theme/util/getInputFilledStyles';

const inputFilledStyles = getInputFilledStyles();

const invokeAI = defineStyle(() => ({
  ...inputFilledStyles,
  borderRadius: 'base',
  '::-webkit-scrollbar': {
    display: 'initial',
  },
  '+ div': {
    pointerEvents: 'none',
    '& svg': {
      transform: 'rotate(90deg)',
    },
  },
  p: 2,
}));

export const textareaTheme = defineStyleConfig({
  variants: {
    invokeAI,
  },
  defaultProps: {
    size: 'md',
    variant: 'invokeAI',
  },
});
