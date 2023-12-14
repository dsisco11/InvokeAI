import {
  forwardRef,
  AccordionButton as ChakraAccordionButton,
} from '@chakra-ui/react';

import type { AccordionButtonProps } from './types';

const AccordionButton = forwardRef((props: AccordionButtonProps, ref) => {
  return <ChakraAccordionButton ref={ref} {...props} />;
});
export default AccordionButton;
