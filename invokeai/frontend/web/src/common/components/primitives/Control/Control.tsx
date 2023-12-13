import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
} from '@chakra-ui/react';
import { ControlProps } from './types';
import { memo } from 'react';

const Control = (props: ControlProps) => {
  const {
    children,
    labelW = 'min-content',
    labelProps,
    ...formControlProps
  } = props;
  return (
    <ChakraFormControl minH={8} {...formControlProps}>
      <ChakraFormLabel w={labelW} flexShrink={0} flexGrow={0} {...labelProps}>
        {props.label}
      </ChakraFormLabel>
      {children}
    </ChakraFormControl>
  );
};

export default memo(Control);
