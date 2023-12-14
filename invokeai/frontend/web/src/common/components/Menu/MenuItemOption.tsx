import {
  MenuItemOption as ChakraMenuItemOption,
  forwardRef,
} from '@chakra-ui/react';
import { MenuItemOptionProps } from 'common/components/Menu/types';

const MenuItemOption = forwardRef((props: MenuItemOptionProps, ref) => {
  return <ChakraMenuItemOption ref={ref} {...props} />;
});

export default MenuItemOption;
