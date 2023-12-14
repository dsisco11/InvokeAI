import { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { InvTooltipProps } from './types';

export const InvTooltip = (props: InvTooltipProps) => {
  const { children, hasArrow = true, placement = 'top', ...rest } = props;
  return (
    <ChakraTooltip hasArrow={hasArrow} placement={placement} {...rest}>
      {children}
    </ChakraTooltip>
  );
};
