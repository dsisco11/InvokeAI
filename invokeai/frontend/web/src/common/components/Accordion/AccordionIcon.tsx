import {
  AccordionIcon as ChakraAccordionIcon,
  forwardRef,
} from '@chakra-ui/react';

import type { AccordionIconProps } from './types';

const AccordionIcon = forwardRef((props: AccordionIconProps, ref) => {
  return <ChakraAccordionIcon ref={ref} {...props} />;
});
export default AccordionIcon;
