import { IconButtonProps } from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import { InvIconButton } from 'common/components';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';

type DeleteImageButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  onClick: () => void;
};

export const DeleteImageButton = (props: DeleteImageButtonProps) => {
  const { onClick, isDisabled } = props;
  const { t } = useTranslation();
  const isConnected = useAppSelector((state) => state.system.isConnected);

  return (
    <InvIconButton
      onClick={onClick}
      icon={<FaTrash />}
      tooltip={`${t('gallery.deleteImage')} (Del)`}
      aria-label={`${t('gallery.deleteImage')} (Del)`}
      isDisabled={isDisabled || !isConnected}
      colorScheme="error"
    />
  );
};
