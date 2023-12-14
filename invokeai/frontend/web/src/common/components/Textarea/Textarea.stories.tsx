import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  tags: ['autodocs'],
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

const Component = (props: Parameters<typeof Textarea>[0]) => {
  return <Textarea {...props} />;
};

export const Default: Story = {
  render: Component,
};
