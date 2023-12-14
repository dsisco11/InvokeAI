import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './Collapse';
import { Text } from 'common/components/Text';

const meta: Meta<typeof Collapse> = {
  title: 'Primitives/Collapse',
  tags: ['autodocs'],
  component: Collapse,
};

export default meta;
type Story = StoryObj<typeof Collapse>;

const Component = (props: Parameters<typeof Collapse>[0]) => {
  return (
    <Collapse
      {...props}
      label="Ode to Banana Sushi"
      badges={['SD1.x', 'LoRA', '1024x1024']}
    >
      <Text>
        Banana sushi is a delightful treat, a fusion of tropical sweetness and
        traditional Japanese cuisine. The ripe, creamy banana pairs perfectly
        with the slightly tangy sushi rice, wrapped in a crisp, seaweed sheet.
        It&apos;s a surprising combination that delights the palate. The banana
        sushi is often drizzled with a touch of honey or a sprinkle of toasted
        sesame seeds, adding an extra layer of flavor and texture. This
        innovative dessert sushi is a testament to the limitless creativity in
        culinary arts. Enjoy this delicious, unique treat that breaks the
        boundaries of conventional sushi.
      </Text>
    </Collapse>
  );
};

export const Default: Story = {
  render: Component,
};
