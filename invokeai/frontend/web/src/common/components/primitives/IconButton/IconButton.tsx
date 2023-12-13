import { IconButton as ChakraIconButton, forwardRef } from '@chakra-ui/react';
import { IconButtonProps } from './types';
import { memo } from 'react';

const IconButton = forwardRef((props: IconButtonProps, ref) => {
  return <ChakraIconButton ref={ref} {...props} />;
});

export default memo(IconButton);
