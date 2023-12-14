import { IconButton as ChakraIconButton, forwardRef } from '@chakra-ui/react';
import { InvIconButtonProps } from './types';

export const InvIconButton = forwardRef((props: InvIconButtonProps, ref) => {
  return <ChakraIconButton ref={ref} {...props} />;
});
