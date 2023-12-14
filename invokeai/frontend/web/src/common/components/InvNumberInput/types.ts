import type {
  NumberInputProps as ChakraNumberInputProps,
  NumberInputFieldProps as ChakraNumberInputFieldProps,
  NumberInputStepperProps as ChakraNumberInputStepperProps,
  NumberIncrementStepperProps as ChakraNumberIncrementStepperProps,
  NumberDecrementStepperProps as ChakraNumberDecrementStepperProps,
} from '@chakra-ui/react';

export type InvNumberInputProps = Omit<ChakraNumberInputProps, 'onChange'> & {
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
   * The fine step (used when shift is pressed)
   */
  fineStep?: number;
  /**
   * The change handler
   */
  onChange: (v: number) => void;
  /**
   * Override props for the Chakra NumberInputField component
   */
  numberInputFieldProps?: ChakraNumberInputFieldProps;
  /**
   * Override props for the Chakra NumberInputStepper component
   */
  numberInputStepperProps?: ChakraNumberInputStepperProps;
  /**
   * Override props for the Chakra NumberIncrementStepper component
   */
  numberIncrementStepperProps?: ChakraNumberIncrementStepperProps;
  /**
   * Override props for the Chakra NumberDecrementStepper component
   */
  numberDecrementStepperProps?: ChakraNumberDecrementStepperProps;
};
