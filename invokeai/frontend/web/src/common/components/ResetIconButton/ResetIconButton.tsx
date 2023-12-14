import { IconButton } from 'common/components/IconButton';
import { ResetIconButtonProps } from './types';
import { memo } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const ResetIconButton = (props: ResetIconButtonProps) => {
  const { t } = useTranslation();
  const {
    onReset,
    size = 'xs',
    variant = 'ghost',
    'aria-label': ariaLabel = t('accessibility.reset'),
    ...rest
  } = props;
  return (
    <IconButton
      aria-label={ariaLabel}
      size={size}
      variant={variant}
      icon={<FaArrowsRotate />}
      onClick={onReset}
      {...rest}
    />
  );
};

export default memo(ResetIconButton);
