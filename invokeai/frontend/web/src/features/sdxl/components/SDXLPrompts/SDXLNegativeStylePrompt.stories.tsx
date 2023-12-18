import type { Meta, StoryObj } from '@storybook/react';
import { SDXLNegativeStylePrompt } from './SDXLNegativeStylePrompt';

const meta: Meta<typeof SDXLNegativeStylePrompt> = {
  title: 'Feature/Prompt/SDXLNegativeStylePrompt',
  tags: ['autodocs'],
  component: SDXLNegativeStylePrompt,
};

export default meta;
type Story = StoryObj<typeof SDXLNegativeStylePrompt>;

const Component = () => {
  return <SDXLNegativeStylePrompt />;
};

export const Default: Story = {
  render: Component,
};
