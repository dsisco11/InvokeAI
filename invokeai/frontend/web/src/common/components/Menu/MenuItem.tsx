import { MenuItem as ChakraMenuItem, forwardRef } from '@chakra-ui/react';
import { MenuItemProps } from 'common/components/Menu/types';

const MenuItem = forwardRef((props: MenuItemProps, ref) => {
  const { isDestructive = false, ...rest } = props;
  return (
    <ChakraMenuItem ref={ref} data-destructive={isDestructive} {...rest} />
  );
});

export default MenuItem;
