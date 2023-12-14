import { Badge, Spacer, forwardRef } from '@chakra-ui/react';
import {
  InvAccordion,
  InvAccordionButton,
  InvAccordionIcon,
  InvAccordionItem,
  InvAccordionPanel,
} from 'common/components/InvAccordion';
import { InvCollapseProps } from 'common/components/InvCollapse/types';

export const InvCollapse = forwardRef((props: InvCollapseProps, ref) => {
  return (
    <InvAccordion ref={ref} allowToggle>
      <InvAccordionItem>
        <InvAccordionButton display="flex" gap={2}>
          {props.label}
          <Spacer />
          {props.badges?.map((badge, i) => (
            <Badge key={`${badge}.${i}`}>{badge}</Badge>
          ))}
          <InvAccordionIcon ms={2} />
        </InvAccordionButton>
        <InvAccordionPanel>{props.children}</InvAccordionPanel>
      </InvAccordionItem>
    </InvAccordion>
  );
});
