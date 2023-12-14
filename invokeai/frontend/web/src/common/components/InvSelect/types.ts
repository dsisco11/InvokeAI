import { ChakraProps } from '@chakra-ui/react';
import {
  Props as ChakraReactSelectProps,
  ChakraStylesConfig,
  GroupBase,
  OptionBase,
} from 'chakra-react-select';
import { ReactNode } from 'react';

export type InvSelectProps = ChakraReactSelectProps<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
> & {
  containerSx?: ChakraProps['sx'];
};

export type CustomChakraStylesConfig = ChakraStylesConfig<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
>;

export interface InvSelectOption extends OptionBase {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
}
