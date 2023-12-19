import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvTextarea } from 'common/components';
import { EmbeddingPopover } from 'features/embedding/components/PromptWithEmbedding/EmbeddingPopover';
import { usePrompt } from 'features/embedding/components/PromptWithEmbedding/usePrompt';
import { setPositiveStylePromptSDXL } from 'features/sdxl/store/sdxlSlice';
import { useCallback, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { SDXLConcatLink } from './SDXLConcatLink';

export const ParamSDXLPositiveStylePrompt = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((state) => state.sdxl.positiveStylePrompt);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const handleChange = useCallback(
    (v: string) => {
      dispatch(setPositiveStylePromptSDXL(v));
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
        placeholder={t('sdxl.posStylePrompt')}
        onChange={onChange}
        onKeyDown={onKeyDown}
        resize="vertical"
        fontSize="sm"
        minH={16}
      />
      <SDXLConcatLink />
    </EmbeddingPopover>
  );
};
