import {
  AccordionProps as ChakraAccordionProps,
  AccordionItemProps as ChakraAccordionItemProps,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionPanelProps as ChakraAccordionPanelProps,
  AccordionIconProps as ChakraAccordionIconProps,
} from '@chakra-ui/react';

export type AccordionProps = ChakraAccordionProps;
export type AccordionItemProps = ChakraAccordionItemProps;
export type AccordionButtonProps = ChakraAccordionButtonProps;
export type AccordionPanelProps = ChakraAccordionPanelProps;
export type AccordionIconProps = ChakraAccordionIconProps;

export type AccordionHeadingProps = Omit<
  ChakraAccordionButtonProps,
  'children'
> & {
  label: string;
  badges?: string[];
};
