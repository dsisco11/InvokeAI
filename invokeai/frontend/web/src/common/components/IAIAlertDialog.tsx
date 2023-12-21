import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  forwardRef,
  useDisclosure,
} from '@chakra-ui/react';
import type { ReactElement, ReactNode } from 'react';
import { cloneElement, memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { InvButton } from './InvButton';

type Props = {
  acceptButtonText?: string;
  acceptCallback: () => void;
  cancelButtonText?: string;
  cancelCallback?: () => void;
  children: ReactNode;
  title: string;
  triggerComponent: ReactElement;
};

const IAIAlertDialog = forwardRef((props: Props, ref) => {
  const { t } = useTranslation();

  const {
    acceptButtonText = t('common.accept'),
    acceptCallback,
    cancelButtonText = t('common.cancel'),
    cancelCallback,
    children,
    title,
    triggerComponent,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleAccept = useCallback(() => {
    acceptCallback();
    onClose();
  }, [acceptCallback, onClose]);

  const handleCancel = useCallback(() => {
    cancelCallback && cancelCallback();
    onClose();
  }, [cancelCallback, onClose]);

  return (
    <>
      {cloneElement(triggerComponent, {
        onClick: onOpen,
        ref: ref,
      })}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{children}</AlertDialogBody>

            <AlertDialogFooter>
              <InvButton ref={cancelRef} onClick={handleCancel}>
                {cancelButtonText}
              </InvButton>
              <InvButton colorScheme="error" onClick={handleAccept} ml={3}>
                {acceptButtonText}
              </InvButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
});
export default memo(IAIAlertDialog);
