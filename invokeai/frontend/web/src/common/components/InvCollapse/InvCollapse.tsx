import {
  InvAccordion,
  InvAccordionButton,
  InvAccordionItem,
  InvAccordionPanel,
} from 'common/components/InvAccordion';
import { InvCollapseProps } from 'common/components/InvCollapse/types';

export const InvCollapse = (props: InvCollapseProps) => {
  return (
    <InvAccordion
      allowToggle
      defaultIndex={props.defaultIsOpen ? 0 : undefined}
    >
      <InvAccordionItem>
        <InvAccordionButton badges={props.badges}>
          {props.label}
        </InvAccordionButton>
        <InvAccordionPanel>{props.children}</InvAccordionPanel>
      </InvAccordionItem>
    </InvAccordion>
  );
};
