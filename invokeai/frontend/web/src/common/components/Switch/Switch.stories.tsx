import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  tags: ['autodocs'],
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

const Component = (props: Parameters<typeof Switch>[0]) => {
  return <Switch {...props} />;
};

export const Default: Story = {
  render: Component,
};
