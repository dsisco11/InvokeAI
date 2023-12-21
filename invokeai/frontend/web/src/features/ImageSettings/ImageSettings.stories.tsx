import type { Meta, StoryObj } from '@storybook/react';

import { ImageSettings } from './ImageSettings';

const meta: Meta<typeof ImageSettings> = {
  title: 'Feature/ImageSettings',
  tags: ['autodocs'],
  component: ImageSettings,
};

export default meta;
type Story = StoryObj<typeof ImageSettings>;

export const Default: Story = {
  render: ImageSettings,
};
