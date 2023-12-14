import { MenuItem as ChakraMenuItem, forwardRef } from '@chakra-ui/react';
import { InvMenuItemProps } from './types';

export const InvMenuItem = forwardRef((props: InvMenuItemProps, ref) => {
  const { isDestructive = false, ...rest } = props;
  return (
    <ChakraMenuItem ref={ref} data-destructive={isDestructive} {...rest} />
  );
});
