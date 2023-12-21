import type { Meta, StoryObj } from '@storybook/react';
import { InvSwitch } from './wrapper';
import type { InvSwitchProps } from './types';

const meta: Meta<typeof InvSwitch> = {
  title: 'Primitives/InvSwitch',
  tags: ['autodocs'],
  component: InvSwitch,
};

export default meta;
type Story = StoryObj<typeof InvSwitch>;

const Component = (props: InvSwitchProps) => {
  return <InvSwitch {...props} />;
};

export const Default: Story = {
  render: Component,
};
