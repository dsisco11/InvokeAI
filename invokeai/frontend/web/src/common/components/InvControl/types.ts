import type {
  FormControlProps as ChakraFormControlProps,
  FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react';
import type { Feature } from 'common/components/IAIInformationalPopover/constants';
import type { PropsWithChildren } from 'react';

export type InvControlProps = ChakraFormControlProps & {
  label?: string;
  helperText?: string;
  labelW?: ChakraFormLabelProps['w'];
  feature?: Feature;
  direction?: 'row' | 'column';
};

export type InvLabelProps = PropsWithChildren<{
  feature?: Feature;
  labelW?: ChakraFormLabelProps['w'];
}>;
