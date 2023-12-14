import { Menu as ChakraMenu } from '@chakra-ui/react';
import { InvMenuProps } from './types';

export const InvMenu = (props: InvMenuProps) => {
  return <ChakraMenu {...props} />;
};
