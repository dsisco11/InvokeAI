import type { Meta, StoryObj } from '@storybook/react';
import { InvSlider } from './InvSlider';
import { useCallback, useState } from 'react';
import { InvSliderProps } from 'common/components/InvSlider/types';

const meta: Meta<typeof InvSlider> = {
  title: 'Primitives/InvSlider',
  tags: ['autodocs'],
  component: InvSlider,
  args: {
    min: 0,
    max: 10,
    step: 1,
    marks: [0, 5, 10],
  },
};

export default meta;
type Story = StoryObj<typeof InvSlider>;

const Component = (props: InvSliderProps) => {
  const [value, setValue] = useState(0);
  const onReset = useCallback(() => {
    setValue(0);
  }, []);
  return (
    <InvSlider {...props} value={value} onChange={setValue} onReset={onReset} />
  );
};

export const Default: Story = {
  render: Component,
  args: {
    fineStep: 0.1,
    withThumbTooltip: true,
    formatValue: (v: number) => `${v} eggs`,
  },
};
