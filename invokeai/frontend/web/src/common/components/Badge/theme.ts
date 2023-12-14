import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  fontSize: 10,
  px: 2,
  py: 1,
  borderRadius: 12,
});

export const badgeTheme = defineStyleConfig({
  baseStyle,
  defaultProps: {
    variant: 'solid',
  },
});
