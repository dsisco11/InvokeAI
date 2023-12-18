import type { Meta, StoryObj } from '@storybook/react';
import { SDXLPositiveStylePrompt } from './SDXLPositiveStylePrompt';

const meta: Meta<typeof SDXLPositiveStylePrompt> = {
  title: 'Feature/Prompt/SDXLPositiveStylePrompt',
  tags: ['autodocs'],
  component: SDXLPositiveStylePrompt,
};

export default meta;
type Story = StoryObj<typeof SDXLPositiveStylePrompt>;

const Component = () => {
  return <SDXLPositiveStylePrompt />;
};

export const Default: Story = {
  render: Component,
};
