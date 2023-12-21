import type { PropsWithChildren } from 'react';

export type InvConfirmationAlertDialogProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  acceptButtonText?: string;
  acceptCallback: () => void;
  cancelButtonText?: string;
  cancelCallback?: () => void;
  title: string;
}>;
