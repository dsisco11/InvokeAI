import { Flex } from '@chakra-ui/layout';
import type { Meta, StoryObj } from '@storybook/react';
import AspectRatioPreview from 'common/components/AspectRatioPreview/AspectRatioPreview';
import { Control } from 'common/components/Control';
import { Slider } from 'common/components/Slider';
import { useState } from 'react';

const meta: Meta<typeof AspectRatioPreview> = {
  title: 'Components/AspectRatioPreview',
  tags: ['autodocs'],
  component: AspectRatioPreview,
};

export default meta;
type Story = StoryObj<typeof Control>;

const MIN = 64;
const MAX = 1024;
const STEP = 64;
const FINE_STEP = 8;
const INITIAL = 512;
const MARKS = Array.from(
  { length: Math.floor(MAX / STEP) },
  (_, i) => MIN + i * STEP
);

const Component = () => {
  const [width, setWidth] = useState(INITIAL);
  const [height, setHeight] = useState(INITIAL);
  return (
    <Flex w="full" flexDir="column">
      <Control label="Width">
        <Slider
          value={width}
          min={MIN}
          max={MAX}
          step={STEP}
          fineStep={FINE_STEP}
          onChange={setWidth}
          marks={MARKS}
        />
      </Control>
      <Control label="Height">
        <Slider
          value={height}
          min={MIN}
          max={MAX}
          step={STEP}
          fineStep={FINE_STEP}
          onChange={setHeight}
          marks={MARKS}
        />
      </Control>
      <Flex h={96} w={96} p={4}>
        <AspectRatioPreview width={width} height={height} />
      </Flex>
    </Flex>
  );
};

export const AspectRatioWithSliderControls: Story = {
  render: Component,
};
