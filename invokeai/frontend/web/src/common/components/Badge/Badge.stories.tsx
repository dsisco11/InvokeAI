import type { Meta, StoryObj } from '@storybook/react';
import Badge from 'common/components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  tags: ['autodocs'],
  component: Badge,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const Component = (props: Parameters<typeof Badge>[0]) => {
  return <Badge {...props}>Invoke</Badge>;
};

export const Default: Story = {
  render: Component,
};
