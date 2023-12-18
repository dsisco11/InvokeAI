import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormHelperText as ChakraFormHelperText,
  Flex,
  forwardRef,
} from '@chakra-ui/react';
import { InvControlProps } from './types';

export const InvControl = forwardRef((props: InvControlProps, ref) => {
  const {
    children,
    helperText,
    labelW = 'min-content',
    labelProps,
    ...formControlProps
  } = props;

  if (helperText) {
    return (
      <ChakraFormControl
        ref={ref}
        variant="withHelperText"
        {...formControlProps}
      >
        <Flex>
          {props.label && (
            <ChakraFormLabel w={labelW} {...labelProps}>
              {props.label}
            </ChakraFormLabel>
          )}
          {children}
        </Flex>
        <ChakraFormHelperText>{helperText}</ChakraFormHelperText>
      </ChakraFormControl>
    );
  }

  return (
    <ChakraFormControl ref={ref} {...formControlProps}>
      {props.label && (
        <ChakraFormLabel w={labelW} {...labelProps}>
          {props.label}
        </ChakraFormLabel>
      )}
      {children}
    </ChakraFormControl>
  );
});
