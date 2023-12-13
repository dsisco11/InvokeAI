import type {
  FormControlProps as ChakraFormControlProps,
  FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react';

export type ControlProps = ChakraFormControlProps & {
  label: string;
  labelProps?: ChakraFormLabelProps;
};
