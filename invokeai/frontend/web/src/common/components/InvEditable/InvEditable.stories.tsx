import type { Meta, StoryObj } from '@storybook/react';
import { InvEditable, InvEditablePreview, InvEditableInput } from './wrapper';
import { InvEditableProps } from './types';

const meta: Meta<typeof InvEditable> = {
  title: 'Primitives/InvEditable',
  tags: ['autodocs'],
  component: InvEditable,
};

export default meta;
type Story = StoryObj<typeof InvEditable>;

const Component = (props: InvEditableProps) => {
  return (
    <InvEditable defaultValue="Take some chakra" {...props}>
      <InvEditablePreview />
      <InvEditableInput />
    </InvEditable>
  );
};

export const Default: Story = {
  render: Component,
};
