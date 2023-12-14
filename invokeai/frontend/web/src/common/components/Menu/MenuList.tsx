import { MenuList as ChakraMenuList, forwardRef } from '@chakra-ui/react';
import { menuListMotionProps } from 'common/components/Menu/constants';
import { MenuListProps } from 'common/components/Menu/types';

const MenuList = forwardRef((props: MenuListProps, ref) => {
  return (
    <ChakraMenuList ref={ref} motionProps={menuListMotionProps} {...props} />
  );
});

export default MenuList;
