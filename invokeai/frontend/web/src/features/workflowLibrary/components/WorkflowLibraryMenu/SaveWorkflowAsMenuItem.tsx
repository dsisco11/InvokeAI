import { useDisclosure } from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import {
  InvConfirmationAlertDialog,
  InvControl,
  InvInput,
  InvMenuItem,
} from 'common/components';
import { useSaveWorkflowAs } from 'features/workflowLibrary/hooks/useSaveWorkflowAs';
import { getWorkflowCopyName } from 'features/workflowLibrary/util/getWorkflowCopyName';
import type { ChangeEvent } from 'react';
import { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaClone } from 'react-icons/fa';

const SaveWorkflowAsButton = () => {
  const currentName = useAppSelector((state) => state.workflow.name);
  const { t } = useTranslation();
  const { saveWorkflowAs } = useSaveWorkflowAs();
  const [name, setName] = useState(getWorkflowCopyName(currentName));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const onOpenCallback = useCallback(() => {
    setName(getWorkflowCopyName(currentName));
    onOpen();
    inputRef.current?.focus();
  }, [currentName, onOpen]);

  const onSave = useCallback(async () => {
    saveWorkflowAs({ name, onSuccess: onClose, onError: onClose });
  }, [name, onClose, saveWorkflowAs]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  return (
    <>
      <InvMenuItem as="button" icon={<FaClone />} onClick={onOpenCallback}>
        {t('workflows.saveWorkflowAs')}
      </InvMenuItem>

      <InvConfirmationAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title={t('workflows.saveWorkflowAs')}
        acceptCallback={onSave}
      >
        <InvControl label={t('workflows.workflowName')}>
          <InvInput
            ref={inputRef}
            value={name}
            onChange={onChange}
            placeholder={t('workflows.workflowName')}
          />
        </InvControl>
      </InvConfirmationAlertDialog>
    </>
  );
};

export default memo(SaveWorkflowAsButton);
