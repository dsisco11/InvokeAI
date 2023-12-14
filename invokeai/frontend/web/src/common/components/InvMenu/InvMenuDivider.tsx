import { MenuDivider as ChakraMenuDivider } from '@chakra-ui/react';
import { InvMenuDividerProps } from './types';

export const InvMenuDivider = (props: InvMenuDividerProps) => {
  return <ChakraMenuDivider {...props} />;
};
