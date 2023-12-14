import { InvIconButtonProps } from 'common/components/InvIconButton';

export type ResetIconButtonProps = Omit<
  InvIconButtonProps,
  'icon' | 'onClick'
> & {
  onReset: () => void;
};
