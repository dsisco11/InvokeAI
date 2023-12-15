import type { Meta, StoryObj } from '@storybook/react';
import { InvBadge } from './wrapper';
import { InvBadgeProps } from './types';

const meta: Meta<typeof InvBadge> = {
  title: 'Primitives/InvBadge',
  tags: ['autodocs'],
  component: InvBadge,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof InvBadge>;

const Component = (props: InvBadgeProps) => {
  return <InvBadge {...props}>Invoke</InvBadge>;
};

export const Default: Story = {
  render: Component,
};
