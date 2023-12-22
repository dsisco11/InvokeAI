import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { buttonVariantPromptOverlay } from 'features/embedding/styles';

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    svg: {
      transitionProperty: 'all',
      transitionDuration: 'faster',
    },
    _hover: {
      svg: {
        transform: 'scale(1.2)',
      },
    },
    _active: {
      svg: {
        transform: 'scale(1.4)',
      },
    },
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 3,
      py: 2,
    },
    md: {
      fontSize: 'md',
      px: 4,
      py: 2,
    },
    lg: {
      fontSize: 'lg',
      px: 4,
      py: 2,
      h: 12,
    },
  },
  variants: {
    solid: defineStyle((props) => {
      const { colorScheme: c } = props;

      const bgBase = 'base.300';
      const bgColor = `${c}.500`;
      const bgBaseHover = 'base.400';
      const bgColorHover = `${c}.400`;
      const fg = 'base.800';

      const bg = c === 'base' ? bgBase : bgColor;
      const bgHover = c === 'base' ? bgBaseHover : bgColorHover;

      const _disabled = {
        bg: bgBase,
        color: fg,
        opacity: 1,
        svg: {
          fill: fg,
        },
        _hover: {
          bg: bgBase,
          color: fg,
          svg: {
            fill: fg,
            transform: 'none',
          },
        },
        filter: 'contrast(50%) brightness(80%)',
      };

      return {
        bg: bg,
        color: fg,
        svg: {
          fill: fg,
        },
        _hover: {
          bg: bgHover,
          color: fg,
          svg: {
            fill: fg,
          },
          _disabled,
        },
        _disabled,
      };
    }),
    appTab: defineStyle((_props) => {
      return {
        bg: 'none',
        svg: {
          fill: 'base.600',
        },
        _hover: {
          bg: 'none',
          svg: {
            fill: 'base.500',
          },
        },
        '&[data-selected="true"]': {
          bg: 'none',
          svg: {
            fill: 'base.100',
          },
        },
      };
    }),
    outline: defineStyle((props) => {
      const { colorScheme: c } = props;
      const _disabled = {
        svg: {
          fill: `${c}.500`,
          filter: 'unset',
        },
        opacity: 0.7,
        filter: 'saturate(65%)',
      };

      return {
        bg: 'none',
        color: `${c}.500`,
        borderColor: `${c}.500`,
        borderWidth: '2px',
        borderStyle: 'solid',
        svg: {
          fill: `${c}.500`,
        },
        _disabled,
        _hover: {
          bg: 'none',
          color: `${c}.500`,
          svg: {
            fill: `${c}.500`,
          },
          _disabled,
        },
      };
    }),
    promptOverlay: buttonVariantPromptOverlay,
  },
  defaultProps: {
    variant: 'solid',
    colorScheme: 'base',
    size: 'md',
  },
});
