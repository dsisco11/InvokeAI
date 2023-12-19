import type { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type InvIconButtonProps = ChakraIconButtonProps & {
  isChecked?: boolean;
  tooltip?: ReactNode;
};
