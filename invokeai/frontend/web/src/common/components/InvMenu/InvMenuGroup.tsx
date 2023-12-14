import { MenuGroup as ChakraMenuGroup, forwardRef } from '@chakra-ui/react';
import { InvMenuGroupProps } from './types';

export const InvMenuGroup = forwardRef((props: InvMenuGroupProps, ref) => {
  return <ChakraMenuGroup ref={ref} {...props} />;
});
