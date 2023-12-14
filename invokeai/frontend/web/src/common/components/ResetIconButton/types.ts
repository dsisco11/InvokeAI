import { IconButtonProps } from 'common/components/IconButton';

export type ResetIconButtonProps = Omit<IconButtonProps, 'icon' | 'onClick'> & {
  onReset: () => void;
};
