import { Box } from '@chakra-ui/layout';
import { InvBadge } from 'common/components/InvBadge/wrapper';
import { InvIconButton } from 'common/components/InvIconButton/InvIconButton';
import { FaStream } from 'react-icons/fa';

export const QueueActionsMenuButton = () => {
  return (
    <Box pos="relative">
      <InvIconButton aria-label="Queue Actions Menu" icon={<FaStream />} />
      <InvBadge
        pos="absolute"
        insetInlineStart={-4}
        insetBlockStart={-2}
        colorScheme="yellow"
        zIndex="docked"
      >
        100
      </InvBadge>
    </Box>
  );
};
