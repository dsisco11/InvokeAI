import { InvIconButton } from 'common/components/InvIconButton';
import { useTranslation } from 'react-i18next';
import { FaArrowsRotate } from 'react-icons/fa6';

import type { ResetIconButtonProps } from './types';

export const ResetIconButton = (props: ResetIconButtonProps) => {
  const { t } = useTranslation();
  const {
    onReset,
    size = 'xs',
    variant = 'ghost',
    'aria-label': ariaLabel = t('accessibility.reset'),
    ...rest
  } = props;
  return (
    <InvIconButton
      aria-label={ariaLabel}
      size={size}
      variant={variant}
      icon={<FaArrowsRotate />}
      onClick={onReset}
      {...rest}
    />
  );
};
