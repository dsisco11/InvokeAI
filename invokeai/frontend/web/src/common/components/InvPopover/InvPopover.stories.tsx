import type { Meta, StoryObj } from '@storybook/react';
import {
  InvPopover,
  InvPopoverTrigger,
  InvPopoverContent,
  InvPopoverHeader,
  InvPopoverBody,
  InvPopoverArrow,
  InvPopoverCloseButton,
} from './wrapper';
import { InvButton } from 'common/components';

const meta: Meta<typeof InvPopover> = {
  title: 'Primitives/InvPopover',
  tags: ['autodocs'],
  component: InvPopover,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof InvPopover>;

const Component = () => {
  return (
    <InvPopover>
      <InvPopoverTrigger>
        <InvButton>Trigger</InvButton>
      </InvPopoverTrigger>
      <InvPopoverContent>
        <InvPopoverArrow />
        <InvPopoverCloseButton />
        <InvPopoverHeader>Confirmation!</InvPopoverHeader>
        <InvPopoverBody>
          Are you sure you want to have that milkshake?
        </InvPopoverBody>
      </InvPopoverContent>
    </InvPopover>
  );
};

export const Default: Story = {
  render: Component,
};
