import type { Meta, StoryObj } from '@storybook/react';
import { EmbeddingPopover } from './EmbeddingPopover';
import { EmbeddingPopoverProps } from 'features/embedding/components/EmbeddingPopover/types';
import { InvButton } from 'common/components';

const meta: Meta<typeof EmbeddingPopover> = {
  title: 'Feature/Embeddings/EmbeddingPopover',
  tags: ['autodocs'],
  component: EmbeddingPopover,
};

export default meta;
type Story = StoryObj<typeof EmbeddingPopover>;

const Component = (props: EmbeddingPopoverProps) => {
  return (
    <EmbeddingPopover {...props}>
      <InvButton>Open</InvButton>
    </EmbeddingPopover>
  );
};

export const Default: Story = {
  render: Component,
};
