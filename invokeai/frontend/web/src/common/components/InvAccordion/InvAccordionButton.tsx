import {
  forwardRef,
  AccordionButton as ChakraAccordionButton,
} from '@chakra-ui/react';

import type { InvAccordionButtonProps } from './types';

export const InvAccordionButton = forwardRef(
  (props: InvAccordionButtonProps, ref) => {
    return <ChakraAccordionButton ref={ref} {...props} />;
  }
);
