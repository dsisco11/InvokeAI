import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvTextarea } from 'common/components/InvTextarea/InvTextarea';
import { EmbeddingPopover } from 'features/embedding/components/PromptWithEmbedding/EmbeddingPopover';
import { usePrompt } from 'features/embedding/components/PromptWithEmbedding/usePrompt';
import { setPositivePrompt } from 'features/parameters/store/generationSlice';
import { useCallback, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

export const ParamPositivePrompt = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((state) => state.generation.positivePrompt);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const handleChange = useCallback(
    (v: string) => {
      dispatch(setPositivePrompt(v));
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
        id="prompt"
        name="prompt"
        ref={inputRef}
        value={prompt}
        placeholder={t('parameters.positivePromptPlaceholder')}
        onChange={onChange}
        onKeyDown={onKeyDown}
        resize="vertical"
        minH={32}
      />
    </EmbeddingPopover>
  );
};
