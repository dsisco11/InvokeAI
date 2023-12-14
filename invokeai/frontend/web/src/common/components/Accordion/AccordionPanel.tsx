import {
  forwardRef,
  AccordionPanel as ChakraAccordionPanel,
} from '@chakra-ui/react';

import type { AccordionPanelProps } from './types';

const AccordionPanel = forwardRef((props: AccordionPanelProps, ref) => {
  return <ChakraAccordionPanel ref={ref} {...props} />;
});
export default AccordionPanel;
