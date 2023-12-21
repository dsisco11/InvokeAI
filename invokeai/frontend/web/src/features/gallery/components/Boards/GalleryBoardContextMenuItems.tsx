import { MenuItem } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import type { BoardDTO } from 'services/api/types';
type Props = {
  board: BoardDTO;
  setBoardToDelete?: (board?: BoardDTO) => void;
};

const GalleryBoardContextMenuItems = ({ board, setBoardToDelete }: Props) => {
  const { t } = useTranslation();
  const handleDelete = useCallback(() => {
    if (!setBoardToDelete) {
      return;
    }
    setBoardToDelete(board);
  }, [board, setBoardToDelete]);

  return (
    <>
      <MenuItem
        sx={{ color: 'error.300' }}
        icon={<FaTrash />}
        onClick={handleDelete}
      >
        {t('boards.deleteBoard')}
      </MenuItem>
    </>
  );
};

export default memo(GalleryBoardContextMenuItems);
