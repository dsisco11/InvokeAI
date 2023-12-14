import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import type { TextareaProps } from 'common/components/Textarea/types';
import { useGlobalModifiersSetters } from 'common/hooks/useGlobalModifiers';
import { stopPastePropagation } from 'common/util/stopPastePropagation';
import { KeyboardEvent, useCallback } from 'react';

const Textarea = (props: TextareaProps) => {
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

export default Textarea;
