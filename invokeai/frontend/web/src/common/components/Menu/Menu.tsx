import { Menu as ChakraMenu } from '@chakra-ui/react';
import { MenuProps } from 'common/components/Menu/types';

const Menu = (props: MenuProps) => {
  return <ChakraMenu {...props} />;
};

export default Menu;
