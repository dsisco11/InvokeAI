import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { useClearQueue } from 'features/queue/hooks/useClearQueue';
import QueueButton from './common/QueueButton';
import type { ChakraProps } from '@chakra-ui/react';
import IAIAlertDialog from 'common/components/IAIAlertDialog';
import { InvText } from 'common/components';

type Props = {
  asIconButton?: boolean;
  sx?: ChakraProps['sx'];
};

const ClearQueueButton = ({ asIconButton, sx }: Props) => {
  const { t } = useTranslation();
  const { clearQueue, isLoading, isDisabled } = useClearQueue();

  return (
    <IAIAlertDialog
      title={t('queue.clearTooltip')}
      acceptCallback={clearQueue}
      acceptButtonText={t('queue.clear')}
      triggerComponent={
        <QueueButton
          isDisabled={isDisabled}
          isLoading={isLoading}
          asIconButton={asIconButton}
          label={t('queue.clear')}
          tooltip={t('queue.clearTooltip')}
          icon={<FaTrash />}
          colorScheme="error"
          sx={sx}
        />
      }
    >
      <InvText>{t('queue.clearQueueAlertDialog')}</InvText>
      <br />
      <InvText>{t('queue.clearQueueAlertDialog2')}</InvText>
    </IAIAlertDialog>
  );
};

export default memo(ClearQueueButton);
