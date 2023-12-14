import {
  AccordionIcon as ChakraAccordionIcon,
  forwardRef,
} from '@chakra-ui/react';

import type { InvAccordionIconProps } from './types';

export const InvAccordionIcon = forwardRef(
  (props: InvAccordionIconProps, ref) => {
    return <ChakraAccordionIcon ref={ref} {...props} />;
  }
);
