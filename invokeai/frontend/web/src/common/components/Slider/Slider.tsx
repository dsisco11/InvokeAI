import {
  Slider as ChakraSlider,
  SliderFilledTrack as ChakraSliderFilledTrack,
  SliderThumb as ChakraSliderThumb,
  SliderTrack as ChakraSliderTrack,
  forwardRef,
  useFormControl,
} from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import { Tooltip } from 'common/components/Tooltip';
import { $modifiers } from 'common/hooks/useGlobalModifiers';
import { AnimatePresence } from 'framer-motion';
import { memo, useCallback, useMemo, useState } from 'react';
import SliderMark from './SliderMark';
import { FormattedMark, SliderProps } from './types';

const Slider = forwardRef((props: SliderProps, ref) => {
  const {
    value,
    min,
    max,
    step: _step,
    fineStep: _fineStep,
    onChange,
    onReset,
    formatValue = (v: number) => v.toString(),
    marks: _marks,
    withThumbTooltip: withTooltip = false,
    sliderThumbProps,
    sliderThumbTooltipProps,
    sliderTrackProps,
    sliderFilledTrackProps,
    sliderMarkProps,
    ...sliderProps
  } = props;
  const [isMouseOverSlider, setIsMouseOverSlider] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const modifiers = useStore($modifiers);
  const step = useMemo(
    () => (modifiers.shift ? _fineStep ?? _step : _step),
    [modifiers.shift, _fineStep, _step]
  );
  const controlProps = useFormControl({});

  const label = useMemo(() => formatValue(value), [formatValue, value]);

  const onMouseEnter = useCallback(() => setIsMouseOverSlider(true), []);
  const onMouseLeave = useCallback(() => setIsMouseOverSlider(false), []);
  const onChangeStart = useCallback(() => setIsChanging(true), []);
  const onChangeEnd = useCallback(() => setIsChanging(false), []);

  const marks = useMemo<FormattedMark[]>(
    () => _marks?.map((m) => ({ value: m, label: formatValue(m) })) ?? [],
    [_marks, formatValue]
  );
  return (
    <ChakraSlider
      ref={ref}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      focusThumbOnChange={false}
      onChangeStart={onChangeStart}
      onChangeEnd={onChangeEnd}
      {...sliderProps}
      {...controlProps}
    >
      <AnimatePresence>
        {marks?.length &&
          (isMouseOverSlider || isChanging) &&
          marks.map((m, i) => (
            <SliderMark
              key={m.value}
              {...sliderMarkProps}
              value={m.value}
              label={m.label}
              index={i}
              total={marks.length}
            />
          ))}
      </AnimatePresence>

      <ChakraSliderTrack {...sliderTrackProps}>
        <ChakraSliderFilledTrack {...sliderFilledTrackProps} />
      </ChakraSliderTrack>

      <Tooltip
        isOpen={withTooltip && (isMouseOverSlider || isChanging)}
        label={label}
        {...sliderThumbTooltipProps}
      >
        <ChakraSliderThumb
          onDoubleClick={onReset}
          zIndex={0}
          {...sliderThumbProps}
        />
      </Tooltip>
    </ChakraSlider>
  );
});

export default memo(Slider);
