import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const accent = defineStyle(() => ({
  color: 'blue.300',
}));

export const headingTheme = defineStyleConfig({
  variants: {
    accent,
  },
});
