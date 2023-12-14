import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { useGlobalModifiersSetters } from 'common/hooks/useGlobalModifiers';
import { stopPastePropagation } from 'common/util/stopPastePropagation';
import { KeyboardEvent, useCallback } from 'react';
import type { InvTextareaProps } from './types';

export const InvTextarea = (props: InvTextareaProps) => {
  const { setShift } = useGlobalModifiersSetters();
  const onKeyUpDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      setShift(e.shiftKey);
    },
    [setShift]
  );
  return (
    <ChakraTextarea
      onPaste={stopPastePropagation}
      onKeyUp={onKeyUpDown}
      onKeyDown={onKeyUpDown}
      {...props}
    />
  );
};
