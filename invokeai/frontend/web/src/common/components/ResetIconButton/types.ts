import type { InvIconButtonProps } from 'common/components/InvIconButton/types';

export type ResetIconButtonProps = Omit<
  InvIconButtonProps,
  'icon' | 'onClick'
> & {
  onReset: () => void;
};
