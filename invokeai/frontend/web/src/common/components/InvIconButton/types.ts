import type { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';

export type InvIconButtonProps = ChakraIconButtonProps & {
  isChecked?: boolean;
  tooltip?: string;
};
