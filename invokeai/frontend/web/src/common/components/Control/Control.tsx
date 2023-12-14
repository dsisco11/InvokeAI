import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormHelperText as ChakraFormHelperText,
  Flex,
  forwardRef,
} from '@chakra-ui/react';
import { ControlProps } from './types';
import { memo } from 'react';

const Control = forwardRef((props: ControlProps, ref) => {
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
          <ChakraFormLabel w={labelW} {...labelProps}>
            {props.label}
          </ChakraFormLabel>
          {children}
        </Flex>
        <ChakraFormHelperText>{helperText}</ChakraFormHelperText>
      </ChakraFormControl>
    );
  }

  return (
    <ChakraFormControl ref={ref} {...formControlProps}>
      <ChakraFormLabel w={labelW} {...labelProps}>
        {props.label}
      </ChakraFormLabel>
      {children}
    </ChakraFormControl>
  );
});

export default memo(Control);
