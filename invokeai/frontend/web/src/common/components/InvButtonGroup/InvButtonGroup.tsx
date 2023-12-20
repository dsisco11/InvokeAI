import { forwardRef } from '@chakra-ui/react';
import { InvButtonGroupProps } from './types';

export const InvButtonGroup = forwardRef(
  ({ isAttached = true, ...rest }: InvButtonGroupProps, ref) => {
    return <InvButtonGroup ref={ref} isAttached={isAttached} {...rest} />;
  }
);
