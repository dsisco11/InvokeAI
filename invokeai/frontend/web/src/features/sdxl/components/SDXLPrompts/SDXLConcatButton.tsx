import { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvIconButton, InvTooltip } from 'common/components';
import { FaLink, FaUnlink } from 'react-icons/fa';
import { setShouldConcatSDXLStylePrompt } from 'features/sdxl/store/sdxlSlice';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const SDXLConcatButton = () => {
  const shouldConcatSDXLStylePrompt = useAppSelector(
    (state: RootState) => state.sdxl.shouldConcatSDXLStylePrompt
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleShouldConcatPromptChange = useCallback(() => {
    dispatch(setShouldConcatSDXLStylePrompt(!shouldConcatSDXLStylePrompt));
  }, [dispatch, shouldConcatSDXLStylePrompt]);

  return (
    <InvTooltip label={t('sdxl.concatPromptStyle')}>
      <InvIconButton
        aria-label={t('sdxl.concatPromptStyle')}
        onClick={handleShouldConcatPromptChange}
        icon={shouldConcatSDXLStylePrompt ? <FaLink /> : <FaUnlink />}
        size="xs"
        variant="promptOverlay"
        pos="absolute"
        insetInlineEnd={1}
        insetBlockStart={6}
      />
    </InvTooltip>
  );
};
