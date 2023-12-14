import { MenuButton as ChakraMenuButton, forwardRef } from '@chakra-ui/react';
import { InvMenuButtonProps } from './types';

export const InvMenuButton = forwardRef((props: InvMenuButtonProps, ref) => {
  return <ChakraMenuButton ref={ref} {...props} />;
});
