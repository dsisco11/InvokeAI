import type { Meta, StoryObj } from '@storybook/react';
import Accordion from 'common/components/Accordion/Accordion';
import AccordionItem from 'common/components/Accordion/AccordionItem';
import AccordionButton from 'common/components/Accordion/AccordionButton';
import AccordionIcon from 'common/components/Accordion/AccordionIcon';
import AccordionPanel from 'common/components/Accordion/AccordionPanel';
import { Box } from '@chakra-ui/layout';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  tags: ['autodocs'],
  component: Accordion,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const Component = (props: Parameters<typeof Accordion>[0]) => {
  return (
    <Accordion {...props} defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const Default: Story = {
  render: Component,
};
