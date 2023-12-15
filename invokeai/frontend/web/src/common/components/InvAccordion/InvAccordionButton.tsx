import {
  AccordionButton as ChakraAccordionButton,
  Spacer,
} from '@chakra-ui/react';
import type { InvAccordionButtonProps } from './types';
import { InvAccordionIcon } from './wrapper';
import { InvBadge } from 'common/components/InvBadge';

export const InvAccordionButton = (props: InvAccordionButtonProps) => {
  const { children, badges, ...rest } = props;
  return (
    <ChakraAccordionButton {...rest}>
      {children}
      <Spacer />
      {badges?.map((b, i) => (
        <InvBadge key={`${b}.${i}`} variant="solid">
          {b}
        </InvBadge>
      ))}
      <InvAccordionIcon />
    </ChakraAccordionButton>
  );
};
