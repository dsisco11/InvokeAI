import { Box } from '@chakra-ui/layout';
import {
  InvPopover,
  InvPopoverBody,
  InvPopoverContent,
  InvPopoverTrigger,
} from 'common/components/InvPopover/wrapper';
import AddEmbeddingButton from 'features/embedding/AddEmbeddingButton';
import { EmbeddingSelect } from 'features/embedding/EmbeddingSelect';
import type { EmbeddingPopoverProps } from 'features/embedding/types';
import { PARAMETERS_PANEL_WIDTH } from 'theme/util/constants';

export const EmbeddingPopover = (props: EmbeddingPopoverProps) => {
  const {
    onSelect,
    isOpen,
    onClose,
    onOpen,
    width = PARAMETERS_PANEL_WIDTH,
    children,
  } = props;

  return (
    <InvPopover
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
      openDelay={0}
      closeDelay={0}
      closeOnBlur={true}
      returnFocusOnClose={true}
      isLazy
    >
      <InvPopoverTrigger>
        <Box position="relative">
          {children}
          <AddEmbeddingButton isOpen={isOpen} onOpen={onOpen} />
        </Box>
      </InvPopoverTrigger>
      <InvPopoverContent
        p={0}
        insetBlockStart={-1}
        shadow="dark-lg"
        borderColor="accent.300"
        borderWidth="2px"
        borderStyle="solid"
      >
        <InvPopoverBody p={0} width={`calc(${width}px - 0.25rem)`}>
          <EmbeddingSelect onClose={onClose} onSelect={onSelect} />
        </InvPopoverBody>
      </InvPopoverContent>
    </InvPopover>
  );
};
