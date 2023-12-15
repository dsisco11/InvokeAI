import { ChakraProps } from '@chakra-ui/react';
import {
  Props as ChakraReactSelectProps,
  ChakraStylesConfig,
  GroupBase,
  OptionBase,
} from 'chakra-react-select';
import { ReactNode } from 'react';
export type {} from 'react-select/base';

export interface InvSelectOption extends OptionBase {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
}

// export type InvSelectOption<D = void> = D extends void
//   ? InvSelectOptionBase
//   : InvSelectOptionBase & { ctx: D };

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

  // export type InvSelectProps<D> = ChakraReactSelectProps<
  //   InvSelectOption<D>,
  //   boolean,
  //   GroupBase<InvSelectOption<D>>
  // > & {
  //   containerSx?: ChakraProps['sx'];
  // };

  // export type CustomChakraStylesConfig<D> = ChakraStylesConfig<
  //   InvSelectOption<D>,
  //   boolean,
  //   GroupBase<InvSelectOption<D>>
>;

// type T = ComponentClass<OptionProps<InvSelectOptionBase | (InvSelectOptionBase & { data: any; }), false, GroupBase<InvSelectOptionBase | (InvSelectOptionBase & { ...; })>>, any>
// type V = ComponentClass<OptionProps<InvSelectOption<D>, false, GroupBase<InvSelectOption<D>>>, any>
