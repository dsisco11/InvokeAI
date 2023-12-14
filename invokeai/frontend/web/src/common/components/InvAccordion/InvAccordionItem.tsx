import {
  forwardRef,
  AccordionItem as ChakraAccordionItem,
} from '@chakra-ui/react';

import type { InvAccordionItemProps } from './types';

export const InvAccordionItem = forwardRef(
  (props: InvAccordionItemProps, ref) => {
    return <ChakraAccordionItem ref={ref} {...props} />;
  }
);
