import { Switch as ChakraSwitch } from '@chakra-ui/react';
import type { InvSwitchProps } from './types';

export const InvSwitch = (props: InvSwitchProps) => {
  return <ChakraSwitch {...props} />;
};
