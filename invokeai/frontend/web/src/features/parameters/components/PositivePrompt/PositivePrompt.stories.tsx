import type { Meta, StoryObj } from '@storybook/react';
import { PositivePrompt } from './PositivePrompt';

const meta: Meta<typeof PositivePrompt> = {
  title: 'Feature/Prompt/PositivePrompt',
  tags: ['autodocs'],
  component: PositivePrompt,
};

export default meta;
type Story = StoryObj<typeof PositivePrompt>;

const Component = () => {
  return <PositivePrompt />;
};

export const Default: Story = {
  render: Component,
};
