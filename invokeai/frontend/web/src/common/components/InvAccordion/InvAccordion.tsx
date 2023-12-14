import { forwardRef, Accordion as ChakraAccordion } from '@chakra-ui/react';

import type { InvAccordionProps } from './types';

export const InvAccordion = forwardRef((props: InvAccordionProps, ref) => {
  return <ChakraAccordion ref={ref} {...props} />;
});
