import { Switch as ChakraSwitch } from '@chakra-ui/react';
import type { SwitchProps } from 'common/components/Switch/types';

const Switch = (props: SwitchProps) => {
  return <ChakraSwitch {...props} />;
};

export default Switch;
