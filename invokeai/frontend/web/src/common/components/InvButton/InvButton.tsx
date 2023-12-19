import { Button, forwardRef } from '@chakra-ui/react';
import { InvButtonProps } from './types';
import { InvTooltip } from 'common/components/InvTooltip';

export const InvButton = forwardRef(
  ({ isChecked, tooltip, ...rest }: InvButtonProps, ref) => {
    if (tooltip) {
      return (
        <InvTooltip label={tooltip}>
          <Button
            ref={ref}
            colorScheme={isChecked ? 'accent' : 'base'}
            {...rest}
          />
        </InvTooltip>
      );
    }

    return (
      <Button ref={ref} colorScheme={isChecked ? 'accent' : 'base'} {...rest} />
    );
  }
);
