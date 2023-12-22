import 'reactflow/dist/style.css';

import { InvText } from 'common/components/InvText/wrapper';
import { forwardRef } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  label: string;
  description: string;
}

export const AddNodePopoverSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <div>
          <InvText fontWeight="semibold">{label}</InvText>
          <InvText size="xs" sx={{ color: 'base.500' }}>
            {description}
          </InvText>
        </div>
      </div>
    );
  }
);

AddNodePopoverSelectItem.displayName = 'AddNodePopoverSelectItem';
