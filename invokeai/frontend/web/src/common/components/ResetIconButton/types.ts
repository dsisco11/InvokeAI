import { IconButtonProps } from 'common/components/primitives/IconButton';

export type ResetIconButtonProps = Omit<IconButtonProps, 'icon' | 'onClick'> & {
  onReset: () => void;
};
