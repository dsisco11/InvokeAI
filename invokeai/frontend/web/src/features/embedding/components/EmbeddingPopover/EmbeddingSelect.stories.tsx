import type { Meta, StoryObj } from '@storybook/react';
import { EmbeddingSelect } from './EmbeddingSelect';
import { EmbeddingSelectProps } from './types';

const meta: Meta<typeof EmbeddingSelect> = {
  title: 'Feature/Embeddings/EmbeddingSelect',
  tags: ['autodocs'],
  component: EmbeddingSelect,
};

export default meta;
type Story = StoryObj<typeof EmbeddingSelect>;

const Component = (props: EmbeddingSelectProps) => {
  return <EmbeddingSelect {...props}>Invoke</EmbeddingSelect>;
};

export const Default: Story = {
  render: Component,
};
