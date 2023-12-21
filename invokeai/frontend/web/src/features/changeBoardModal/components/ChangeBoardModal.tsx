import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Flex,
} from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import type { InvSelectOnChange, InvSelectOption } from 'common/components';
import { InvButton, InvControl, InvSelect, InvText } from 'common/components';
import {
  changeBoardReset,
  isModalOpenChanged,
} from 'features/changeBoardModal/store/slice';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useListAllBoardsQuery } from 'services/api/endpoints/boards';
import {
  useAddImagesToBoardMutation,
  useRemoveImagesFromBoardMutation,
} from 'services/api/endpoints/images';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ changeBoardModal }) => {
    const { isModalOpen, imagesToChange } = changeBoardModal;

    return {
      isModalOpen,
      imagesToChange,
    };
  }
);

const ChangeBoardModal = () => {
  const dispatch = useAppDispatch();
  const [selectedBoard, setSelectedBoard] = useState<string | null>();
  const { data: boards, isFetching } = useListAllBoardsQuery();
  const { imagesToChange, isModalOpen } = useAppSelector(selector);
  const [addImagesToBoard] = useAddImagesToBoardMutation();
  const [removeImagesFromBoard] = useRemoveImagesFromBoardMutation();
  const { t } = useTranslation();

  const options = useMemo<InvSelectOption[]>(() => {
    return [{ label: t('boards.uncategorized'), value: 'none' }].concat(
      (boards ?? []).map((board) => ({
        label: board.board_name,
        value: board.board_id,
      }))
    );
  }, [boards, t]);

  const value = useMemo(
    () => options.find((o) => o.value === selectedBoard),
    [options, selectedBoard]
  );

  const handleClose = useCallback(() => {
    dispatch(changeBoardReset());
    dispatch(isModalOpenChanged(false));
  }, [dispatch]);

  const handleChangeBoard = useCallback(() => {
    if (!imagesToChange.length || !selectedBoard) {
      return;
    }

    if (selectedBoard === 'none') {
      removeImagesFromBoard({ imageDTOs: imagesToChange });
    } else {
      addImagesToBoard({
        imageDTOs: imagesToChange,
        board_id: selectedBoard,
      });
    }
    setSelectedBoard(null);
    dispatch(changeBoardReset());
  }, [
    addImagesToBoard,
    dispatch,
    imagesToChange,
    removeImagesFromBoard,
    selectedBoard,
  ]);

  const onChange = useCallback<InvSelectOnChange>((v) => {
    if (!v) {
      return;
    }
    setSelectedBoard(v.value);
  }, []);

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isModalOpen}
      onClose={handleClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('boards.changeBoard')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Flex sx={{ flexDir: 'column', gap: 4 }}>
              <InvText>
                {t('boards.movingImagesToBoard', {
                  count: imagesToChange.length,
                })}
                :
              </InvText>
              <InvControl isDisabled={isFetching}>
                <InvSelect
                  placeholder={
                    isFetching ? t('boards.loading') : t('boards.selectBoard')
                  }
                  onChange={onChange}
                  value={value}
                  options={options}
                />
              </InvControl>
            </Flex>
          </AlertDialogBody>
          <AlertDialogFooter>
            <InvButton ref={cancelRef} onClick={handleClose}>
              {t('boards.cancel')}
            </InvButton>
            <InvButton colorScheme="accent" onClick={handleChangeBoard} ml={3}>
              {t('boards.move')}
            </InvButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default memo(ChangeBoardModal);
