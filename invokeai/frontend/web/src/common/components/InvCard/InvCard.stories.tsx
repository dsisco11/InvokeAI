import type { Meta, StoryObj } from '@storybook/react';
import { InvCard } from './wrapper';
import { InvCardProps } from './types';

const meta: Meta<typeof InvCard> = {
  title: 'Primitives/InvCard',
  tags: ['autodocs'],
  component: InvCard,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof InvCard>;

const Component = (props: InvCardProps) => {
  return <InvCard {...props}>Invoke</InvCard>;
};

export const Default: Story = {
  render: Component,
};
