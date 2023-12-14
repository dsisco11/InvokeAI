import { Text as ChakraText } from '@chakra-ui/react';
import type { TextProps } from 'common/components/Text/types';

const Text = (props: TextProps) => {
  return <ChakraText {...props} />;
};

export default Text;
