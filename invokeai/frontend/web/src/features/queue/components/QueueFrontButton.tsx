import type { ChakraProps } from '@chakra-ui/react';
import { useQueueFront } from 'features/queue/hooks/useQueueFront';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBoltLightning } from 'react-icons/fa6';

import QueueButton from './common/QueueButton';
import EnqueueButtonTooltip from './QueueButtonTooltip';

type Props = {
  asIconButton?: boolean;
  sx?: ChakraProps['sx'];
};

const QueueFrontButton = ({ asIconButton, sx }: Props) => {
  const { t } = useTranslation();
  const { queueFront, isLoading, isDisabled } = useQueueFront();
  return (
    <QueueButton
      asIconButton={asIconButton}
      colorScheme="base"
      label={t('queue.queueFront')}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={queueFront}
      tooltip={<EnqueueButtonTooltip prepend />}
      icon={<FaBoltLightning />}
      sx={sx}
    />
  );
};

export default memo(QueueFrontButton);
