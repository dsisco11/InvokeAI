import type { Meta, StoryObj } from '@storybook/react';
import ImageSizeCollapse from './ImageSizeCollapse';

const meta: Meta<typeof ImageSizeCollapse> = {
  title: 'Feature/ImageSizeCollapse',
  tags: ['autodocs'],
  component: ImageSizeCollapse,
};

export default meta;
type Story = StoryObj<typeof ImageSizeCollapse>;

export const Default: Story = {
  render: ImageSizeCollapse,
};
