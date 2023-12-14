import { Checkbox as ChakraCheckbox, forwardRef } from '@chakra-ui/react';
import type { InvCheckboxProps } from './types';

export const InvCheckbox = forwardRef((props: InvCheckboxProps, ref) => {
  return <ChakraCheckbox ref={ref} {...props} />;
});
