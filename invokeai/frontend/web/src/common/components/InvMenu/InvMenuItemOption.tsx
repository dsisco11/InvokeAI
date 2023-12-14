import {
  MenuItemOption as ChakraMenuItemOption,
  forwardRef,
} from '@chakra-ui/react';
import { InvMenuItemOptionProps } from './types';

export const InvMenuItemOption = forwardRef(
  (props: InvMenuItemOptionProps, ref) => {
    return <ChakraMenuItemOption ref={ref} {...props} />;
  }
);
