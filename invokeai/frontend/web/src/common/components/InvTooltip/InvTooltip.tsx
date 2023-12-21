import { Tooltip as ChakraTooltip, forwardRef } from '@chakra-ui/react';
import type { InvTooltipProps } from './types';

export const InvTooltip = forwardRef((props: InvTooltipProps, ref) => {
  const { children, hasArrow = true, placement = 'top', ...rest } = props;
  return (
    <ChakraTooltip
      ref={ref}
      hasArrow={hasArrow}
      placement={placement}
      {...rest}
    >
      {children}
    </ChakraTooltip>
  );
});
