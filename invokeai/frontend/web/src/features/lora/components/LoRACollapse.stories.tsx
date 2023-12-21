import type { Meta, StoryObj } from '@storybook/react';

import { LoRACard } from './LoRACard';
import LoRACollapse from './LoRACollapse';

const meta: Meta<typeof LoRACollapse> = {
  title: 'Feature/LoRAs',
  tags: ['autodocs'],
  component: LoRACollapse,
};

export default meta;
type Story = StoryObj<typeof LoRACollapse>;

/**
 * LoRA Select in a Collapse. This is a "live" component, start up your server and refresh to select a LoRA.
 */
export const InCollapse: Story = {
  name: 'LoRA Select in Collapse',
  render: () => <LoRACollapse />,
};

export const CardOnly: Story = {
  render: () => (
    <LoRACard
      lora={{
        base_model: 'sd-1',
        id: '1',
        model_name: 'my_lora_model',
        weight: 0.75,
      }}
    />
  ),
};
