import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvAutosizeTextarea } from 'common/components/InvAutosizeTextarea/InvAutosizeTextarea';
import { EmbeddingPopover } from 'features/embedding/EmbeddingPopover';
import { usePrompt } from 'features/embedding/usePrompt';
import { setNegativePrompt } from 'features/parameters/store/generationSlice';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const ParamNegativePrompt = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((state) => state.generation.negativePrompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const _onChange = useCallback(
    (v: string) => {
      dispatch(setNegativePrompt(v));
    },
    [dispatch]
  );
  const { onChange, isOpen, onClose, onOpen, onSelectEmbedding, onKeyDown } =
    usePrompt({
      prompt,
      textareaRef,
      onChange: _onChange,
    });

  return (
    <EmbeddingPopover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      onSelect={onSelectEmbedding}
      width={textareaRef.current?.clientWidth}
    >
      <InvAutosizeTextarea
        id="negativePrompt"
        name="negativePrompt"
        ref={textareaRef}
        value={prompt}
        placeholder={t('parameters.negativePromptPlaceholder')}
        onChange={onChange}
        onKeyDown={onKeyDown}
        minH="unset"
        fontSize="sm"
        minRows={2}
        maxRows={5}
      />
    </EmbeddingPopover>
  );
};
