import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Flex,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvButton, InvText } from 'common/components';
import { nodeEditorReset } from 'features/nodes/store/nodesSlice';
import { addToast } from 'features/system/store/systemSlice';
import { makeToast } from 'features/system/util/makeToast';
import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCircleNodes } from 'react-icons/fa6';

const NewWorkflowMenuItem = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const isTouched = useAppSelector((state) => state.workflow.isTouched);

  const handleNewWorkflow = useCallback(() => {
    dispatch(nodeEditorReset());

    dispatch(
      addToast(
        makeToast({
          title: t('workflows.newWorkflowCreated'),
          status: 'success',
        })
      )
    );

    onClose();
  }, [dispatch, onClose, t]);

  const onClick = useCallback(() => {
    if (!isTouched) {
      handleNewWorkflow();
      return;
    }
    onOpen();
  }, [handleNewWorkflow, isTouched, onOpen]);

  return (
    <>
      <MenuItem as="button" icon={<FaCircleNodes />} onClick={onClick}>
        {t('nodes.newWorkflow')}
      </MenuItem>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('nodes.newWorkflow')}
          </AlertDialogHeader>

          <AlertDialogBody py={4}>
            <Flex flexDir="column" gap={2}>
              <InvText>{t('nodes.newWorkflowDesc')}</InvText>
              <InvText variant="subtext">{t('nodes.newWorkflowDesc2')}</InvText>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <InvButton ref={cancelRef} onClick={onClose}>
              {t('common.cancel')}
            </InvButton>
            <InvButton colorScheme="error" ml={3} onClick={handleNewWorkflow}>
              {t('common.accept')}
            </InvButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default memo(NewWorkflowMenuItem);
