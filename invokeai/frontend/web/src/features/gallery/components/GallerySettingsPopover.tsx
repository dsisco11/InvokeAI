import { Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import {
  InvControl,
  InvSwitch,
  InvSlider,
  InvCheckbox,
  InvIconButton,
  InvPopover,
  InvPopoverTrigger,
  InvPopoverContent,
  InvPopoverBody,
} from 'common/components';
import {
  autoAssignBoardOnClickChanged,
  setGalleryImageMinimumWidth,
  shouldAutoSwitchChanged,
} from 'features/gallery/store/gallerySlice';
import { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWrench } from 'react-icons/fa';
import BoardAutoAddSelect from './Boards/BoardAutoAddSelect';

const selector = createMemoizedSelector([stateSelector], (state) => {
  const { galleryImageMinimumWidth, shouldAutoSwitch, autoAssignBoardOnClick } =
    state.gallery;

  return {
    galleryImageMinimumWidth,
    shouldAutoSwitch,
    autoAssignBoardOnClick,
  };
});

const GallerySettingsPopover = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { galleryImageMinimumWidth, shouldAutoSwitch, autoAssignBoardOnClick } =
    useAppSelector(selector);

  const handleChangeGalleryImageMinimumWidth = useCallback(
    (v: number) => {
      dispatch(setGalleryImageMinimumWidth(v));
    },
    [dispatch]
  );

  const handleResetGalleryImageMinimumWidth = useCallback(() => {
    dispatch(setGalleryImageMinimumWidth(64));
  }, [dispatch]);

  const handleChangeAutoSwitch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(shouldAutoSwitchChanged(e.target.checked));
    },
    [dispatch]
  );

  const handleChangeAutoAssignBoardOnClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(autoAssignBoardOnClickChanged(e.target.checked)),
    [dispatch]
  );

  return (
    <InvPopover>
      <InvPopoverTrigger>
        <InvIconButton
          tooltip={t('gallery.gallerySettings')}
          aria-label={t('gallery.gallerySettings')}
          size="sm"
          icon={<FaWrench />}
        />
      </InvPopoverTrigger>
      <InvPopoverContent>
        <InvPopoverBody>
          <Flex direction="column" gap={2}>
            <InvControl label={t('gallery.galleryImageSize')}>
              <InvSlider
                value={galleryImageMinimumWidth}
                onChange={handleChangeGalleryImageMinimumWidth}
                min={45}
                max={256}
                onReset={handleResetGalleryImageMinimumWidth}
              />
            </InvControl>
            <InvControl label={t('gallery.autoSwitchNewImages')}>
              <InvSwitch
                isChecked={shouldAutoSwitch}
                onChange={handleChangeAutoSwitch}
              />
            </InvControl>
            <InvControl label={t('gallery.autoAssignBoardOnClick')}>
              <InvCheckbox
                isChecked={autoAssignBoardOnClick}
                onChange={handleChangeAutoAssignBoardOnClick}
              />
            </InvControl>
            <BoardAutoAddSelect />
          </Flex>
        </InvPopoverBody>
      </InvPopoverContent>
    </InvPopover>
  );
};

export default memo(GallerySettingsPopover);
