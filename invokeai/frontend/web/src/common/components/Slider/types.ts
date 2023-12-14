import type {
  SliderProps as ChakraSliderProps,
  SliderTrackProps as ChakraSliderTrackProps,
  SliderInnerTrackProps as ChakraSliderInnerTrackProps,
  SliderThumbProps as ChakraSliderThumbProps,
  SliderMarkProps as ChakraSliderMarkProps,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';

export type SliderProps = Omit<ChakraSliderProps, 'value'> & {
  /**
   * The value
   */
  value: number;
  /**
   * The minimum value
   */
  min: number;
  /**
   * The maximum value
   */
  max: number;
  /**
   * The default step
   */
  step: number;
  /**
   * The fine step (when shift is pressed)
   */
  fineStep?: number;
  /**
   * The change handler
   */
  onChange: (v: number) => void;
  /**
   * The reset handler, called on double-click of the thumb
   */
  onReset?: () => void;
  /**
   * The value formatter
   */
  formatValue?: (v: number) => string;
  /**
   * Whether the slider is disabled
   */
  isDisabled?: boolean;
  /**
   * The marks to render below the slider
   */
  marks?: number[];
  /**
   * Whether to show a tooltip over the slider thumb
   */
  withThumbTooltip?: boolean;
  /**
   * Override props for the Chakra SliderTrack component
   */
  sliderTrackProps?: ChakraSliderTrackProps;
  /**
   * Override props for the Chakra FilledTrack component
   */
  sliderFilledTrackProps?: ChakraSliderInnerTrackProps;
  /**
   * Override props for the Chakra SliderThumb component
   */
  sliderThumbProps?: ChakraSliderThumbProps;
  /**
   * Override props for the SliderThumb's Chakra Tooltip component
   */
  sliderThumbTooltipProps?: ChakraTooltipProps;
  /**
   * Override props for the Chakra SliderMark component
   */
  sliderMarkProps?: ChakraSliderMarkProps;
};

export type FormattedMark = { value: number; label: string };
