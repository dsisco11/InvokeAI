import { useAppSelector } from 'app/store/storeHooks';
import { InvText } from 'common/components/InvText/wrapper';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';

const TopCenterPanel = () => {
  const { t } = useTranslation();
  const name = useAppSelector((state) => state.workflow.name);
  const isTouched = useAppSelector((state) => state.workflow.isTouched);
  const isWorkflowLibraryEnabled =
    useFeatureStatus('workflowLibrary').isFeatureEnabled;

  return (
    <InvText
      m={2}
      fontSize="lg"
      userSelect="none"
      noOfLines={1}
      wordBreak="break-all"
      fontWeight={600}
      opacity={0.8}
    >
      {name || t('workflows.unnamedWorkflow')}
      {isTouched && isWorkflowLibraryEnabled ? ` (${t('common.unsaved')})` : ''}
    </InvText>
  );
};

export default memo(TopCenterPanel);
