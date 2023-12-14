import type {
  FormControlProps as ChakraFormControlProps,
  FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react';

export type InvControlProps = ChakraFormControlProps & {
  label: string;
  helperText?: string;
  labelW?: ChakraFormLabelProps['w'];
  labelProps?: ChakraFormLabelProps;
};
