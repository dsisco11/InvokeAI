import { numberInputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { getInputFilledStyles } from 'theme/util/getInputFilledStyles';
import { getInputOutlineStyles } from 'theme/util/getInputOutlineStyles';

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const invokeAI = definePartsStyle(() => ({
  root: {
    height: 8,
  },
  field: {
    border: 'none',
    fontWeight: '600',
    height: 'auto',
    py: 1,
    ps: 2,
    pe: 6,
    ...getInputOutlineStyles(),
  },
  stepperGroup: {
    display: 'flex',
  },
  stepper: {
    border: 'none',
    // expand arrow hitbox
    px: 2,
    py: 0,
    mx: -2,
    my: 0,

    svg: {
      color: 'base.300',
      width: 2.5,
      height: 2.5,
      _hover: {
        color: 'base.100',
      },
    },
  },
}));

const filled = definePartsStyle(() => {
  return {
    root: {},
    field: getInputFilledStyles(),
    stepperGroup: {
      border: 'none',
      w: 8,
    },
    stepper: {
      color: 'base.200',
      _hover: {
        bg: 'base.700',
        color: 'base.100',
      },
      _disabled: {
        _hover: {
          bg: 'base.800',
          color: 'base.200',
        },
      },
      _first: {
        border: 'none',
        margin: 0,
        borderTopEndRadius: 'base',
        borderBottomStartRadius: '3px',
      },
      _last: {
        border: 'none',
        margin: 0,
        borderBottomEndRadius: 'base',
        borderTopStartRadius: '3px',
      },
    },
  };
});

export const numberInputTheme = defineMultiStyleConfig({
  variants: {
    invokeAI,
    filled,
  },
  defaultProps: {
    size: 'sm',
    variant: 'filled',
  },
});
