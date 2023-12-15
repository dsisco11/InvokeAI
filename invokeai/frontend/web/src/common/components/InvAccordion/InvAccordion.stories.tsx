import type { Meta, StoryObj } from '@storybook/react';
import {
  InvAccordion,
  InvAccordionItem,
  InvAccordionButton,
  InvAccordionIcon,
  InvAccordionPanel,
} from './wrapper';
import { Box } from '@chakra-ui/layout';
import { InvAccordionProps } from './types';

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
        <h2>
          <InvAccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <InvAccordionIcon />
          </InvAccordionButton>
        </h2>
        <InvAccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </InvAccordionPanel>
      </InvAccordionItem>

      <InvAccordionItem>
        <h2>
          <InvAccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 2 title
            </Box>
            <InvAccordionIcon />
          </InvAccordionButton>
        </h2>
        <InvAccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </InvAccordionPanel>
      </InvAccordionItem>
    </InvAccordion>
  );
};

export const Default: Story = {
  render: Component,
};
