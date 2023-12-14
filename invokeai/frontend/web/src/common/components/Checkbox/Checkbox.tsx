import { Checkbox as ChakraCheckbox, forwardRef } from '@chakra-ui/react';
import type { CheckboxProps } from 'common/components/Checkbox/types';

const Checkbox = forwardRef((props: CheckboxProps, ref) => {
  return <ChakraCheckbox ref={ref} {...props} />;
});

export default Checkbox;
