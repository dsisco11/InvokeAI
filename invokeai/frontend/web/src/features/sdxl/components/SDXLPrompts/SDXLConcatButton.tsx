import { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvIconButton, InvTooltip } from 'common/components';
import { FaLink, FaUnlink } from 'react-icons/fa';
import { setShouldConcatSDXLStylePrompt } from 'features/sdxl/store/sdxlSlice';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';

export const SDXLConcatButton = () => {
  const shouldConcatSDXLStylePrompt = useAppSelector(
    (state: RootState) => state.sdxl.shouldConcatSDXLStylePrompt
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleShouldConcatPromptChange = useCallback(() => {
    dispatch(setShouldConcatSDXLStylePrompt(!shouldConcatSDXLStylePrompt));
  }, [dispatch, shouldConcatSDXLStylePrompt]);

  const label = useMemo(
    () =>
      shouldConcatSDXLStylePrompt
        ? t('sdxl.concatPromptStyle')
        : t('sdxl.freePromptStyle'),
    [shouldConcatSDXLStylePrompt, t]
  );

  return (
    <InvTooltip label={label}>
      <InvIconButton
        aria-label={label}
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
