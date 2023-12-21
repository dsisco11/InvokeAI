import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const invokeAI = definePartsStyle(() => ({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: 500,
    bg: 'base.500',
    color: 'base.100',
    _hover: {
      bg: 'base.600',
      color: 'base.50',
      fontWeight: 600,
    },
  },
  list: {
    zIndex: 9999,
    color: 'base.150',
    bg: 'base.800',
    shadow: 'dark-lg',
    border: 'none',
    p: 0,
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    _first: {
      borderTopRadius: 'md',
    },
    _last: {
      borderBottomRadius: 'md',
    },
    fontSize: 'sm',
    bg: 'base.800',
    _hover: {
      bg: 'base.700',
      svg: {
        opacity: 1,
      },
    },
    _focus: {
      bg: 'base.700',
    },
    svg: {
      opacity: 0.7,
      fontSize: 14,
    },
    "&[data-destructive='true']": {
      color: 'error.500',
      fill: 'error.300',
      _hover: {
        bg: 'error.500',
        color: 'base.50',
        fill: 'base.50',
      },
    },
    "&[aria-selected='true']": {
      fontWeight: 600,
      bg: 'accent.500 !important',
      color: 'base.100 !important',
      _hover: {
        color: 'base.50 !important',
        bg: 'accent.400 !important',
      },
    },
    "&[aria-selected='true'] [data-option-desc='true']": {
      color: 'base.100',
    },
  },
  divider: {
    borderColor: 'base.700',
  },
}));

export const menuTheme = defineMultiStyleConfig({
  variants: {
    invokeAI,
  },
  defaultProps: {
    variant: 'invokeAI',
  },
});
