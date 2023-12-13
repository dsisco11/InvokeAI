import type { Meta, StoryObj } from '@storybook/react';
import Control from './Control';
import { Slider } from 'common/components/primitives/Slider';
import { NumberInput } from 'common/components/primitives/NumberInput';
import { useState } from 'react';

const meta: Meta<typeof Control> = {
  title: 'Primitives/Control',
  tags: ['autodocs'],
  component: Control,
  args: {
    label: 'My Control',
    isDisabled: false,
    isInvalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Control>;

const ControlWithSliderComponent = (props: Parameters<typeof Control>[0]) => {
  const [value, setValue] = useState(0);
  return (
    <Control {...props}>
      <Slider value={value} min={0} max={10} step={1} onChange={setValue} />
    </Control>
  );
};
const ControlWithNumberInputComponent = (
  props: Parameters<typeof Control>[0]
) => {
  const [value, setValue] = useState(0);
  return (
    <Control {...props}>
      <NumberInput
        value={value}
        min={0}
        max={10}
        step={1}
        onChange={setValue}
      />
    </Control>
  );
};

export const ControlWithSlider: Story = {
  render: ControlWithSliderComponent,
};

export const ControlWithNumberInput: Story = {
  render: ControlWithNumberInputComponent,
};
