import type { Meta, StoryObj } from '@storybook/react';
import { ResetIconButtonProps } from './types';
import { ResetIconButton } from './ResetIconButton';

const meta: Meta<typeof ResetIconButton> = {
  title: 'Components/ResetIconButton',
  tags: ['autodocs'],
  component: ResetIconButton,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof ResetIconButton>;

const Component = (props: ResetIconButtonProps) => {
  return <ResetIconButton {...props}>oke</ResetIconButton>;
};

export const Default: Story = {
  render: Component,
};
