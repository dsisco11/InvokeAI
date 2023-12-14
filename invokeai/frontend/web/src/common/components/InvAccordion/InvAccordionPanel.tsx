import {
  forwardRef,
  AccordionPanel as ChakraAccordionPanel,
} from '@chakra-ui/react';

import type { InvAccordionPanelProps } from './types';

export const InvAccordionPanel = forwardRef(
  (props: InvAccordionPanelProps, ref) => {
    return <ChakraAccordionPanel ref={ref} {...props} />;
  }
);
