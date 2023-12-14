import { Button } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { InvTooltip } from './InvTooltip';
import { InvTooltipProps } from './types';

const meta: Meta<typeof InvTooltip> = {
  title: 'Primitives/InvTooltip',
  component: InvTooltip,
  tags: ['autodocs'],
  args: {
    label: 'My Tooltip',
    placement: 'top',
    hasArrow: true,
  },
};

export default meta;
type Story = StoryObj<typeof InvTooltip>;

const render = (props: InvTooltipProps) => (
  <InvTooltip {...props}>
    <Button>Invoke</Button>
  </InvTooltip>
);

export const Default: Story = {
  render,
};

export const WithoutArrow: Story = {
  render,
  args: {
    hasArrow: false,
  },
};
