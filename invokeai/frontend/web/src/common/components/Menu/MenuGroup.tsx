import { MenuGroup as ChakraMenuGroup, forwardRef } from '@chakra-ui/react';
import { MenuGroupProps } from 'common/components/Menu/types';

const MenuGroup = forwardRef((props: MenuGroupProps, ref) => {
  return <ChakraMenuGroup ref={ref} {...props} />;
});

export default MenuGroup;
