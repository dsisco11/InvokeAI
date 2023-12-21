import {
  InvAccordion,
  InvAccordionButton,
  InvAccordionItem,
  InvAccordionPanel,
} from 'common/components/InvAccordion';
import type { InvSingleAccordionProps } from './types';

export const InvSingleAccordion = (props: InvSingleAccordionProps) => {
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
