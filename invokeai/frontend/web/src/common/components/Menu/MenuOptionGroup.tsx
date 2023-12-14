import { MenuOptionGroup as ChakraMenuOptionGroup } from '@chakra-ui/react';
import { MenuOptionGroupProps } from 'common/components/Menu/types';

const MenuOptionGroup = (props: MenuOptionGroupProps) => {
  return <ChakraMenuOptionGroup {...props} />;
};

export default MenuOptionGroup;
