import {
  Flex,
  FormControl as ChakraFormControl,
  FormHelperText as ChakraFormHelperText,
  forwardRef,
} from '@chakra-ui/react';

import { InvLabel } from './InvLabel';
import type { InvControlProps } from './types';

export const InvControl = forwardRef((props: InvControlProps, ref) => {
  const {
    children,
    helperText,
    labelW = 'min-content',
    feature,
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
            <InvLabel feature={feature} labelW={labelW}>
              {props.label}
            </InvLabel>
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
        <InvLabel feature={feature} labelW={labelW}>
          {props.label}
        </InvLabel>
      )}
      {children}
    </ChakraFormControl>
  );
});
