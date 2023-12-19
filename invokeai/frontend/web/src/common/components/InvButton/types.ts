import type { ButtonProps } from '@chakra-ui/react';

export type InvButtonProps = ButtonProps & {
  isChecked?: boolean;
  tooltip?: string;
};
