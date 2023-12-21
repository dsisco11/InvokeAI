import type { SystemStyleObject } from '@chakra-ui/styled-system';

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
    '~ .textarea-resize-handle': {
      borderColor: 'error.600',
      _hover: {
        borderColor: 'error.500',
      },
    },
  };
  const _hover = {
    bg: 'base.750',
    borderColor: 'base.750',
    '~ .textarea-resize-handle': {
      bg: 'base.750',
      borderColor: 'base.750',
    },
  };
  const _focusVisible = {
    ..._hover,
    _invalid,
    '~ .textarea-resize-handle': {
      ..._hover,
      _invalid,
    },
  };
  const _disabled = {
    _hover: baseColors,
    '~ .textarea-resize-handle': {
      _hover: baseColors,
    },
  };
  return {
    ...baseColors,
    borderWidth: 1,
    borderRadius: 'md',
    outline: 'none',
    boxShadow: 'none',
    _hover,
    _focusVisible,
    _invalid,
    _disabled,
    '~ .textarea-resize-handle': {
      ...baseColors,
      transitionProperty: 'common',
      transitionDuration: 'normal',
      borderBottomEndRadius: 'base',
      position: 'absolute',
      insetInlineEnd: 0,
      insetBlockEnd: 0,
      paddingInlineEnd: 1,
      paddingBlockEnd: 1,
      paddingInlineStart: 3,
      paddingBlockStart: 3,
      '& svg': {
        color: 'base.400',
      },
    },
  };
};
