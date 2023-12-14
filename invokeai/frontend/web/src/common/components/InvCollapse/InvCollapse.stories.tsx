import type { Meta, StoryObj } from '@storybook/react';
import { InvCollapse } from './InvCollapse';
import { InvText } from 'common/components/InvText';
import { InvCollapseProps } from 'common/components/InvCollapse/types';

const meta: Meta<typeof InvCollapse> = {
  title: 'Primitives/InvCollapse',
  tags: ['autodocs'],
  component: InvCollapse,
};

export default meta;
type Story = StoryObj<typeof InvCollapse>;

const Component = (props: InvCollapseProps) => {
  return (
    <InvCollapse
      {...props}
      label="Ode to Banana Sushi"
      badges={['SD1.x', 'LoRA', '1024x1024']}
    >
      <InvText>
        Banana sushi is a delightful treat, a fusion of tropical sweetness and
        traditional Japanese cuisine. The ripe, creamy banana pairs perfectly
        with the slightly tangy sushi rice, wrapped in a crisp, seaweed sheet.
        It&apos;s a surprising combination that delights the palate. The banana
        sushi is often drizzled with a touch of honey or a sprinkle of toasted
        sesame seeds, adding an extra layer of flavor and texture. This
        innovative dessert sushi is a testament to the limitless creativity in
        culinary arts. Enjoy this delicious, unique treat that breaks the
        boundaries of conventional sushi.
      </InvText>
    </InvCollapse>
  );
};

export const Default: Story = {
  render: Component,
};
