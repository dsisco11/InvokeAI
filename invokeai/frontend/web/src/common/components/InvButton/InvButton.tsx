import { Button, forwardRef } from '@chakra-ui/react';
import { InvTooltip } from 'common/components/InvTooltip/InvTooltip';

import type { InvButtonProps } from './types';

export const InvButton = forwardRef(
  ({ isChecked, tooltip, children, ...rest }: InvButtonProps, ref) => {
    if (tooltip) {
      return (
        <InvTooltip label={tooltip}>
          <Button
            ref={ref}
            colorScheme={isChecked ? 'accent' : 'base'}
            {...rest}
          >
            {children}
          </Button>
        </InvTooltip>
      );
    }

    return (
      <Button ref={ref} colorScheme={isChecked ? 'accent' : 'base'} {...rest}>
        {children}
      </Button>
    );
  }
);
