import type { Meta, StoryObj } from '@storybook/react';
import LoRACollapse from './LoRACollapse';

const meta: Meta<typeof LoRACollapse> = {
  title: 'Feature/LoRACollapse',
  tags: ['autodocs'],
  component: LoRACollapse,
};

export default meta;
type Story = StoryObj<typeof LoRACollapse>;

export const Default: Story = {
  render: () => <LoRACollapse />,
};
