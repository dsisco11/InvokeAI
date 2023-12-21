import { forwardRef, IconButton } from '@chakra-ui/react';
import type { InvIconButtonProps } from 'common/components/InvIconButton/types';
import { InvTooltip } from 'common/components/InvTooltip';

export const InvIconButton = forwardRef(
  ({ isChecked, tooltip, ...rest }: InvIconButtonProps, ref) => {
    if (tooltip) {
      return (
        <InvTooltip label={tooltip}>
          <IconButton
            ref={ref}
            colorScheme={isChecked ? 'accent' : 'base'}
            {...rest}
          />
        </InvTooltip>
      );
    }

    return (
      <IconButton
        ref={ref}
        colorScheme={isChecked ? 'accent' : 'base'}
        {...rest}
      />
    );
  }
);
