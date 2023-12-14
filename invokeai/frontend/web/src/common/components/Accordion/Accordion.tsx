import { forwardRef, Accordion as ChakraAccordion } from '@chakra-ui/react';

import type { AccordionProps } from './types';

const Accordion = forwardRef((props: AccordionProps, ref) => {
  return <ChakraAccordion ref={ref} {...props} />;
});
export default Accordion;
