import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  tags: ['autodocs'],
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

const Component = (props: Parameters<typeof Text>[0]) => {
  return <Text {...props}>Banana sushi is delectable!</Text>;
};

export const Default: Story = {
  render: Component,
};
