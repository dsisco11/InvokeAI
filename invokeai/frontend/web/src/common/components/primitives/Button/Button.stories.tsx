import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  tags: ['autodocs'],
  component: Button,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const Component = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props}>Invoke</Button>;
};

export const Default: Story = {
  render: Component,
};
