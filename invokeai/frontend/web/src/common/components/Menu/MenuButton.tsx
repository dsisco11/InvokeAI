import { MenuButton as ChakraMenuButton, forwardRef } from '@chakra-ui/react';
import { MenuButtonProps } from 'common/components/Menu/types';

const MenuButton = forwardRef((props: MenuButtonProps, ref) => {
  return <ChakraMenuButton ref={ref} {...props} />;
});

export default MenuButton;
