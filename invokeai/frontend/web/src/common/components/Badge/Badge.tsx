import { Badge as ChakraBadge, forwardRef } from '@chakra-ui/react';
import { BadgeProps } from './types';
import { memo } from 'react';

const Badge = forwardRef((props: BadgeProps, ref) => {
  const { children, ...rest } = props;
  return (
    <ChakraBadge ref={ref} {...rest}>
      {children}
    </ChakraBadge>
  );
});

export default memo(Badge);
