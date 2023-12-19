import type { Meta, StoryObj } from '@storybook/react';
import { ParamSeed } from './ParamSeed';

const meta: Meta<typeof ParamSeed> = {
  title: 'Feature/ParamSeed',
  tags: ['autodocs'],
  component: ParamSeed,
};

export default meta;
type Story = StoryObj<typeof ParamSeed>;

export const Default: Story = {
  render: ParamSeed,
};
