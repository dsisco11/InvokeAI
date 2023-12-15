import { forwardRef } from '@chakra-ui/react';
import {
  InvAccordion,
  InvAccordionButton,
  InvAccordionItem,
  InvAccordionPanel,
} from 'common/components/InvAccordion';
import { InvCollapseProps } from 'common/components/InvCollapse/types';

export const InvCollapse = forwardRef((props: InvCollapseProps, ref) => {
  return (
    <InvAccordion ref={ref} allowToggle>
      <InvAccordionItem>
        <InvAccordionButton badges={props.badges}>
          {props.label}
        </InvAccordionButton>
        <InvAccordionPanel>{props.children}</InvAccordionPanel>
      </InvAccordionItem>
    </InvAccordion>
  );
});
