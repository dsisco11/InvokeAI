import { Button as ChakraButton, forwardRef } from '@chakra-ui/react';
import { InvButtonProps } from './types';

export const InvButton = forwardRef((props: InvButtonProps, ref) => {
  const { children, ...rest } = props;
  return (
    <ChakraButton ref={ref} {...rest}>
      {children}
    </ChakraButton>
  );
});
