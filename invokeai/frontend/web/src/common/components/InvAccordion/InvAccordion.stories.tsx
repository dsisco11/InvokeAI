import type { Meta, StoryObj } from '@storybook/react';
import { InvAccordion, InvAccordionItem, InvAccordionPanel } from './wrapper';
import { InvAccordionProps } from './types';
import { InvText } from 'common/components/InvText';
import { InvAccordionButton } from './InvAccordionButton';

const meta: Meta<typeof InvAccordion> = {
  title: 'Primitives/InvAccordion',
  tags: ['autodocs'],
  component: InvAccordion,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof InvAccordion>;

const Component = (props: InvAccordionProps) => {
  return (
    <InvAccordion {...props} defaultIndex={[0]} allowMultiple>
      <InvAccordionItem>
        <InvAccordionButton>Section 1 title</InvAccordionButton>
        <InvAccordionPanel p={4}>
          <InvText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </InvText>
        </InvAccordionPanel>
      </InvAccordionItem>

      <InvAccordionItem>
        <InvAccordionButton>Section 2 title</InvAccordionButton>
        <InvAccordionPanel p={4}>
          <InvText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </InvText>
        </InvAccordionPanel>
      </InvAccordionItem>
    </InvAccordion>
  );
};

export const Default: Story = {
  render: Component,
};
