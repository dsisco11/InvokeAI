import type { Meta, StoryObj } from '@storybook/react';
import { NegativePrompt } from './NegativePrompt';

const meta: Meta<typeof NegativePrompt> = {
  title: 'Feature/Prompt/NegativePrompt',
  tags: ['autodocs'],
  component: NegativePrompt,
};

export default meta;
type Story = StoryObj<typeof NegativePrompt>;

const Component = () => {
  return <NegativePrompt />;
};

export const Default: Story = {
  render: Component,
};
