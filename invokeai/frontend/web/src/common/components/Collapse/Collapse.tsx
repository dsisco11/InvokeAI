import { Badge, Spacer, forwardRef } from '@chakra-ui/react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from 'common/components/Accordion';
import { CollapseProps } from 'common/components/Collapse/types';

const Collapse = forwardRef((props: CollapseProps, ref) => {
  return (
    <Accordion ref={ref} allowToggle>
      <AccordionItem>
        <AccordionButton display="flex" gap={2}>
          {props.label}
          <Spacer />
          {props.badges?.map((badge, i) => (
            <Badge key={`${badge}.${i}`}>{badge}</Badge>
          ))}
          <AccordionIcon ms={2} />
        </AccordionButton>
        <AccordionPanel>{props.children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});

export default Collapse;
