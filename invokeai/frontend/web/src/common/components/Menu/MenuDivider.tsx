import { MenuDivider as ChakraMenuDivider } from '@chakra-ui/react';
import { MenuDividerProps } from 'common/components/Menu/types';

const MenuDivider = (props: MenuDividerProps) => {
  return <ChakraMenuDivider {...props} />;
};

export default MenuDivider;
