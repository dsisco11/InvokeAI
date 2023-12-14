import type { Meta, StoryObj } from '@storybook/react';
import { InvButton } from './InvButton';
import { InvButtonProps } from 'common/components/InvButton/types';

const meta: Meta<typeof InvButton> = {
  title: 'Primitives/InvButton',
  tags: ['autodocs'],
  component: InvButton,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof InvButton>;

const Component = (props: InvButtonProps) => {
  return <InvButton {...props}>Invoke</InvButton>;
};

export const Default: Story = {
  render: Component,
};
