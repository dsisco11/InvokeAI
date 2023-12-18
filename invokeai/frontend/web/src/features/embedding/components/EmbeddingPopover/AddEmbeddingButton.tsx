import { InvIconButton, InvTooltip } from 'common/components';
import { memo } from 'react';
import { FaCode } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import type { SystemStyleObject } from '@chakra-ui/react';

type Props = {
  onClick: () => void;
};

const iconButtonStyles: SystemStyleObject = {
  p: 2,
  bg: 'none',
  fill: 'base.400',
  _hover: {
    bg: 'none',
    fill: 'base.300',
  },
  _active: {
    bg: 'none',
    fill: 'base.300',
  },
  '& svg': {
    bg: 'inherit',
    fill: 'inherit',
  },
};

const AddEmbeddingButton = (props: Props) => {
  const { onClick } = props;
  const { t } = useTranslation();
  return (
    <InvTooltip label={t('embedding.addEmbedding')}>
      <InvIconButton
        size="sm"
        aria-label={t('embedding.addEmbedding')}
        icon={<FaCode />}
        sx={iconButtonStyles}
        onClick={onClick}
      />
    </InvTooltip>
  );
};

export default memo(AddEmbeddingButton);
