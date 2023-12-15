import { accordionAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const invokeAIContainer = defineStyle({
  border: 'none',
  bg: 'base.800',
  borderRadius: 'base',
  ':has(button:hover)': { bg: 'base.750' },
  transitionProperty: 'common',
  transitionDuration: '0.2s',
});

const invokeAIButton = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontWeight: '600',
    fontSize: 'sm',
    border: 'none',
    borderRadius: 'base',
    // bg: `${c}.700`,
    color: `${c}.100`,
    _hover: {
      // bg: `${c}.650`,
    },
    _expanded: {
      // bg: `${c}.650`,
      borderBottomRadius: 'none',
      _hover: {
        // bg: `${c}.600`,
      },
    },
  };
});

const invokeAIPanel = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.700`,
    borderRadius: 'base',
    p: 4,
  };
});

const invokeAIIcon = defineStyle({});

const invokeAI = definePartsStyle((props) => ({
  container: invokeAIContainer,
  button: invokeAIButton(props),
  panel: invokeAIPanel(props),
  icon: invokeAIIcon,
}));

const baseStyle = definePartsStyle(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
}));

export const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { invokeAI },
  defaultProps: {
    variant: 'invokeAI',
    colorScheme: 'base',
  },
});
