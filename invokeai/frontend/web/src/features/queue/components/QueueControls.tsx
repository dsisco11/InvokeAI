import { Flex, Spacer } from '@chakra-ui/react';
import { useAppDispatch } from 'app/store/storeHooks';
import { InvButton } from 'common/components/InvButton/InvButton';
import { InvButtonGroup } from 'common/components/InvButtonGroup/InvButtonGroup';
import CancelCurrentQueueItemButton from 'features/queue/components/CancelCurrentQueueItemButton';
import ClearQueueButton from 'features/queue/components/ClearQueueButton';
import PauseProcessorButton from 'features/queue/components/PauseProcessorButton';
import QueueFrontButton from 'features/queue/components/QueueFrontButton';
import ResumeProcessorButton from 'features/queue/components/ResumeProcessorButton';
import ProgressBar from 'features/system/components/ProgressBar';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { setActiveTab } from 'features/ui/store/uiSlice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetQueueStatusQuery } from 'services/api/endpoints/queue';

import { InvokeQueueBackButton } from './InvokeQueueBackButton';
import { QueueActionsMenuButton } from './QueueActionsMenuButton';

const QueueControls = () => {
  const isPauseEnabled = useFeatureStatus('pauseQueue').isFeatureEnabled;
  const isResumeEnabled = useFeatureStatus('resumeQueue').isFeatureEnabled;
  const isPrependEnabled = useFeatureStatus('prependQueue').isFeatureEnabled;
  return (
    <Flex
      layerStyle="first"
      sx={{
        w: 'full',
        position: 'relative',
        borderRadius: 'base',
        gap: 2,
        flexDir: 'column',
      }}
    >
      <InvButtonGroup size="lg" isAttached={false}>
        {isPrependEnabled && <QueueFrontButton />}
        <InvokeQueueBackButton />
        <Spacer />
        <QueueActionsMenuButton />
        <CancelCurrentQueueItemButton asIconButton />
        {isResumeEnabled && <ResumeProcessorButton asIconButton />}
        {isPauseEnabled && <PauseProcessorButton asIconButton />}
        <ClearQueueButton asIconButton />
      </InvButtonGroup>
      <Flex h={1} w="full">
        <ProgressBar />
      </Flex>
    </Flex>
  );
};

export default QueueControls;

const QueueCounts = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { hasItems, pending } = useGetQueueStatusQuery(undefined, {
    selectFromResult: ({ data }) => {
      if (!data) {
        return {
          hasItems: false,
          pending: 0,
        };
      }

      const { pending, in_progress } = data.queue;

      return {
        hasItems: pending + in_progress > 0,
        pending,
      };
    },
  });

  const handleClick = useCallback(() => {
    dispatch(setActiveTab('queue'));
  }, [dispatch]);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      pe={1}
      data-testid="queue-count"
    >
      <Spacer />
      <InvButton
        onClick={handleClick}
        size="sm"
        variant="link"
        opacity={0.7}
        fontStyle="oblique 10deg"
      >
        {hasItems
          ? t('queue.queuedCount', {
              pending,
            })
          : t('queue.queueEmpty')}
      </InvButton>
    </Flex>
  );
};
