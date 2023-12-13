import type { Meta, StoryObj } from '@storybook/react';
import ResetIconButton from './ResetIconButton';

const meta: Meta<typeof ResetIconButton> = {
  tags: ['autodocs'],
  component: ResetIconButton,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof ResetIconButton>;

const Component = (props: Parameters<typeof ResetIconButton>[0]) => {
  return <ResetIconButton {...props}>Invoke</ResetIconButton>;
};

export const Default: Story = {
  render: Component,
};
