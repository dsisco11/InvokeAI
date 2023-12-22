import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { buttonVariantPromptOverlay } from 'features/embedding/styles';

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    // borderRadius: 'sm',
    svg: {
      transitionProperty: 'all',
      transitionDuration: 'faster',
    },
    _hover: {
      svg: {
        transform: 'scale(1.2)',
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

      const bg = c === 'base' ? `${c}.300` : `${c}.500`;
      const bgHover = c === 'base' ? `${c}.400` : `${c}.400`;
      const fg = 'base.800';

      const _disabled = {
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
        },
        opacity: 0.7,
      };

      return {
        bg: bg,
        color: fg,
        svg: {
          fill: fg,
        },
        _disabled,
        _hover: {
          bg: bgHover,
          color: fg,
          svg: {
            fill: fg,
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
