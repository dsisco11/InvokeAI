import type { Meta, StoryObj } from '@storybook/react';
import { ControlProps } from 'common/components/Control';
import { NumberInput } from 'common/components/NumberInput';
import { Select, SelectOption } from 'common/components/Select';
import { Slider } from 'common/components/Slider';
import { useState } from 'react';
import Control from './Control';

const meta: Meta<typeof Control> = {
  title: 'Primitives/Control',
  tags: ['autodocs'],
  component: Control,
  args: {
    label: 'My Control',
    isDisabled: false,
    isInvalid: false,
    w: 96,
  },
};

export default meta;
type Story = StoryObj<typeof Control>;

const ControlWithSliderComponent = (props: ControlProps) => {
  const [value, setValue] = useState(0);
  return (
    <Control {...props}>
      <Slider value={value} min={0} max={10} step={1} onChange={setValue} />
    </Control>
  );
};

const ControlWithSliderAndHelperTextComponent = (props: ControlProps) => {
  const [value, setValue] = useState(0);
  return (
    <Control {...props} helperText="This is some helpful text">
      <Slider value={value} min={0} max={10} step={1} onChange={setValue} />
    </Control>
  );
};

const ControlWithNumberInputComponent = (props: ControlProps) => {
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

const options: SelectOption[] = [
  {
    value: 'chocolate',
    label: 'Chocolate',
  },
  {
    value: 'strawberry',
    label: 'Strawberry',
  },
  {
    value: 'vanilla',
    label: 'Vanilla',
  },
];
const ControlWithSelectComponent = (props: ControlProps) => {
  return (
    <Control {...props}>
      <Select defaultValue={options[0]} options={options} />
    </Control>
  );
};

export const ControlWithSlider: Story = {
  render: ControlWithSliderComponent,
};

export const ControlWithSliderAndHelperText: Story = {
  render: ControlWithSliderAndHelperTextComponent,
};

export const ControlWithNumberInput: Story = {
  render: ControlWithNumberInputComponent,
};

export const ControlWithSelect: Story = {
  render: ControlWithSelectComponent,
};
