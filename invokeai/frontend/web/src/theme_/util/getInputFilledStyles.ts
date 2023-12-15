import { SystemStyleObject } from '@chakra-ui/styled-system';

export const getInputFilledStyles = (): SystemStyleObject => {
  const baseColors = {
    color: 'base.200',
    bg: 'base.800',
    borderColor: 'base.800',
  };
  const _invalid = {
    borderColor: 'error.600',
    _hover: {
      borderColor: 'error.500',
    },
  };
  const _hover = {
    bg: 'base.750',
    borderColor: 'base.750',
  };
  return {
    ...baseColors,
    borderWidth: 1,
    borderRadius: 'md',
    outline: 'none',
    boxShadow: 'none',
    _hover,
    _focusVisible: {
      ..._hover,
      _invalid,
    },
    _invalid,
    _disabled: {
      _hover: { ...baseColors },
    },
  };
};
