import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvTextarea } from 'common/components/InvTextarea/InvTextarea';
import { EmbeddingPopover } from 'features/embedding/EmbeddingPopover';
import { usePrompt } from 'features/embedding/usePrompt';
import { setNegativeStylePromptSDXL } from 'features/sdxl/store/sdxlSlice';
import { useCallback, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

import { SDXLConcatLink } from './SDXLConcatLink';

export const ParamSDXLNegativeStylePrompt = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((state) => state.sdxl.negativeStylePrompt);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const handleChange = useCallback(
    (v: string) => {
      dispatch(setNegativeStylePromptSDXL(v));
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
        placeholder={t('sdxl.negStylePrompt')}
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
