import {
  Props as ChakraReactSelectProps,
  GroupBase,
  OptionBase,
} from 'chakra-react-select';
import { ReactNode } from 'react';

export type SelectProps = ChakraReactSelectProps<
  SelectOption,
  false,
  GroupBase<SelectOption>
>;

export interface SelectOption extends OptionBase {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
}
