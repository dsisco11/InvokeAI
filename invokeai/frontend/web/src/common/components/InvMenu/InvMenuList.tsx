import { MenuList as ChakraMenuList, forwardRef } from '@chakra-ui/react';
import { menuListMotionProps } from './constants';
import type { InvMenuListProps } from './types';

export const InvMenuList = forwardRef((props: InvMenuListProps, ref) => {
  return (
    <ChakraMenuList ref={ref} motionProps={menuListMotionProps} {...props} />
  );
});

export default InvMenuList;
