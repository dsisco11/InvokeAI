import { defineStyle } from '@chakra-ui/react';

export const buttonVariantPromptOverlay = defineStyle(() => {
  const _disabled = {
    bg: 'none',
    color: 'base.500',
    svg: {
      fill: 'base.500',
    },
    opacity: 0.7,
  };

  return {
    bg: 'none',
    color: 'base.400',
    svg: {
      fill: 'base.400',
    },
    _disabled,
    _hover: {
      bg: 'none',
      color: 'base.300',
      _disabled,
    },
  };
});
