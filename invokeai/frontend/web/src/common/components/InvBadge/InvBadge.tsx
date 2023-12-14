import { Badge as ChakraBadge, forwardRef } from '@chakra-ui/react';
import { InvBadgeProps } from './types';

export const InvBadge = forwardRef((props: InvBadgeProps, ref) => {
  const { children, ...rest } = props;
  return (
    <ChakraBadge ref={ref} {...rest}>
      {children}
    </ChakraBadge>
  );
});
