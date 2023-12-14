import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Component = (props: Parameters<typeof Checkbox>[0]) => {
  return <Checkbox {...props} />;
};

export const Default: Story = {
  render: Component,
};
