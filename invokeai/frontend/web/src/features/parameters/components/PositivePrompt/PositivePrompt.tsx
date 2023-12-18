import { Box, useDisclosure } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvTextarea } from 'common/components';
import AddEmbeddingButton from 'features/embedding/components/EmbeddingPopover/AddEmbeddingButton';
import { EmbeddingPopover } from 'features/embedding/components/EmbeddingPopover/EmbeddingPopover';
import { setPositivePrompt } from 'features/parameters/store/generationSlice';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { ChangeEvent, KeyboardEvent, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

const promptInputSelector = createMemoizedSelector(
  [stateSelector],
  ({ generation }) => {
    return {
      prompt: generation.positivePrompt,
    };
  }
);

export const PositivePrompt = () => {
  const dispatch = useAppDispatch();
  const { prompt } = useAppSelector(promptInputSelector);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { t } = useTranslation();
  const handleChangePrompt = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setPositivePrompt(e.target.value));
    },
    [dispatch]
  );

  useHotkeys(
    'alt+a',
    () => {
      promptRef.current?.focus();
    },
    []
  );

  const handleClose = useCallback(() => {
    onClose();
    promptRef.current?.focus();
  }, [onClose]);

  const handleSelectEmbedding = useCallback(
    (v: string) => {
      if (!promptRef.current) {
        return;
      }

      // this is where we insert the TI trigger
      const caret = promptRef.current.selectionStart;

      if (caret === undefined) {
        return;
      }

      let newPrompt = prompt.slice(0, caret);

      if (newPrompt[newPrompt.length - 1] !== '<') {
        newPrompt += '<';
      }

      newPrompt += `${v}>`;

      // we insert the cursor after the `>`
      const finalCaretPos = newPrompt.length;

      newPrompt += prompt.slice(caret);

      // must flush dom updates else selection gets reset
      flushSync(() => {
        dispatch(setPositivePrompt(newPrompt));
      });

      // set the caret position to just after the TI trigger
      promptRef.current.selectionStart = finalCaretPos;
      promptRef.current.selectionEnd = finalCaretPos;
      handleClose();
    },
    [dispatch, handleClose, prompt]
  );

  const isEmbeddingEnabled = useFeatureStatus('embedding').isFeatureEnabled;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (isEmbeddingEnabled && e.key === '<') {
        onOpen();
        e.preventDefault();
      }
    },
    [onOpen, isEmbeddingEnabled]
  );

  return (
    <Box position="relative">
      <EmbeddingPopover
        isOpen={isOpen}
        onClose={handleClose}
        onSelect={handleSelectEmbedding}
        width={promptRef.current?.clientWidth}
      >
        <InvTextarea
          id="prompt"
          name="prompt"
          ref={promptRef}
          value={prompt}
          placeholder={t('parameters.positivePromptPlaceholder')}
          onChange={handleChangePrompt}
          onKeyDown={handleKeyDown}
          resize="vertical"
          minH={32}
        />
      </EmbeddingPopover>
      {!isOpen && isEmbeddingEnabled && (
        <Box pos="absolute" insetBlockStart={0} insetInlineEnd={0}>
          <AddEmbeddingButton onClick={onOpen} />
        </Box>
      )}
    </Box>
  );
};
