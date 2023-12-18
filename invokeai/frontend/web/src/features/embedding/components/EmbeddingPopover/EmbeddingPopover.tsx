import {
  InvPopover,
  InvPopoverBody,
  InvPopoverContent,
  InvPopoverTrigger,
} from 'common/components';
import { EmbeddingSelect } from 'features/embedding/components/EmbeddingPopover/EmbeddingSelect';
import { EmbeddingPopoverProps } from 'features/embedding/components/EmbeddingPopover/types';
import { PARAMETERS_PANEL_WIDTH } from 'theme/util/constants';

export const EmbeddingPopover = (props: EmbeddingPopoverProps) => {
  const {
    onSelect,
    isOpen,
    onClose,
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
      <InvPopoverTrigger>{children}</InvPopoverTrigger>
      <InvPopoverContent
        p={0}
        top={-1}
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
