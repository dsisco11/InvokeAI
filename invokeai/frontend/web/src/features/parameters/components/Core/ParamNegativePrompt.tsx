import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvTextarea } from 'common/components';
import { EmbeddingPopover } from 'features/embedding/components/PromptWithEmbedding/EmbeddingPopover';
import { usePrompt } from 'features/embedding/components/PromptWithEmbedding/usePrompt';
import { setNegativePrompt } from 'features/parameters/store/generationSlice';
import { useCallback, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

export const ParamNegativePrompt = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((state) => state.generation.negativePrompt);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const handleChange = useCallback(
    (v: string) => {
      dispatch(setNegativePrompt(v));
    },
    [dispatch]
  );
  const {
    onChange,
    isOpen,
    onClose,
    onOpen,
    onSelectEmbedding,
    onKeyDown,
    onFocus,
  } = usePrompt({
    prompt,
    textareaRef: inputRef,
    onChange: handleChange,
  });

  useHotkeys('alt+a', onFocus, []);

  return (
    <EmbeddingPopover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      onSelect={onSelectEmbedding}
      width={inputRef.current?.clientWidth}
    >
      <InvTextarea
        id="negativePrompt"
        name="negativePrompt"
        ref={inputRef}
        value={prompt}
        placeholder={t('parameters.negativePromptPlaceholder')}
        onChange={onChange}
        onKeyDown={onKeyDown}
        resize="vertical"
        fontSize="sm"
        minH={16}
      />
    </EmbeddingPopover>
  );
};
