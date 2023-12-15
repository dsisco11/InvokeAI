import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  fontSize: 10,
  px: 2,
  py: 1,
  borderRadius: 'base',
});

const tab = defineStyle({
  p: 1,
  lineHeight: 1,
  minW: 5,
  borderRadius: 4,
  bg: 'accent.400',
});

export const badgeTheme = defineStyleConfig({
  baseStyle,
  variants: { tab, solid: {} },
  defaultProps: {
    variant: 'solid',
  },
});
