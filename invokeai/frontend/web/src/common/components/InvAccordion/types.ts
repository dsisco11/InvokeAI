import type { AccordionButtonProps as ChakraAccordionButtonProps } from '@chakra-ui/react';
export type {
  AccordionProps as InvAccordionProps,
  AccordionItemProps as InvAccordionItemProps,
  AccordionPanelProps as InvAccordionPanelProps,
  AccordionIconProps as InvAccordionIconProps,
} from '@chakra-ui/react';

export type InvAccordionButtonProps = ChakraAccordionButtonProps & {
  badges?: (string | number)[];
};
