import { ChakraProps } from '@chakra-ui/react';
import {
  Props as ChakraReactSelectProps,
  ChakraStylesConfig,
  GroupBase,
  OptionBase,
  SingleValue,
} from 'chakra-react-select';
import { ReactNode } from 'react';
export type {} from 'react-select/base';

export interface InvSelectOption extends OptionBase {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  tooltip?: string;
}

export type InvSelectProps = ChakraReactSelectProps<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
> & {
  sx?: ChakraProps['sx'];
};

export type CustomChakraStylesConfig = ChakraStylesConfig<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
>;

export type InvSelectFallbackProps = {
  label: string;
};

export type InvSelectOnChange = (v: SingleValue<InvSelectOption>) => void;
