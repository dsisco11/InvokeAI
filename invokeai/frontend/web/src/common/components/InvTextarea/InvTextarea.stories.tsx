import type { Meta, StoryObj } from '@storybook/react';
import { InvTextarea } from './InvTextarea';
import { InvTextareaProps } from './types';

const meta: Meta<typeof InvTextarea> = {
  title: 'Primitives/InvTextarea',
  tags: ['autodocs'],
  component: InvTextarea,
};

export default meta;
type Story = StoryObj<typeof InvTextarea>;

const Component = (props: InvTextareaProps) => {
  return <InvTextarea {...props} />;
};

export const Default: Story = {
  render: Component,
};
