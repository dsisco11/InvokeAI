import { InvIconButton, InvTooltip } from 'common/components';
import { memo } from 'react';
import { FaCode } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
};

const AddEmbeddingButton = (props: Props) => {
  const { onOpen, isOpen } = props;
  const { t } = useTranslation();
  return (
    <InvTooltip label={t('embedding.addEmbedding')}>
      <InvIconButton
        size="sm"
        variant="promptOverlay"
        isDisabled={isOpen}
        aria-label={t('embedding.addEmbedding')}
        icon={<FaCode />}
        onClick={onOpen}
        pos="absolute"
        insetBlockStart={0}
        insetInlineEnd={0}
      />
    </InvTooltip>
  );
};

export default memo(AddEmbeddingButton);
