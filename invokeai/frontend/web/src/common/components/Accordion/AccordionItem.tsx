import {
  forwardRef,
  AccordionItem as ChakraAccordionItem,
} from '@chakra-ui/react';

import type { AccordionItemProps } from './types';

const AccordionItem = forwardRef((props: AccordionItemProps, ref) => {
  return <ChakraAccordionItem ref={ref} {...props} />;
});
export default AccordionItem;
