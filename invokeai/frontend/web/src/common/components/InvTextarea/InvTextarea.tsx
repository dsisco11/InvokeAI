import { Box, Textarea as ChakraTextarea, forwardRef } from '@chakra-ui/react';
import { useGlobalModifiersSetters } from 'common/hooks/useGlobalModifiers';
import { stopPastePropagation } from 'common/util/stopPastePropagation';
import { KeyboardEvent, useCallback } from 'react';
import { IoResizeSharp } from 'react-icons/io5';
import type { InvTextareaProps } from './types';

export const InvTextarea = forwardRef((props: InvTextareaProps, ref) => {
  const { resize = 'none', ...rest } = props;
  const { setShift } = useGlobalModifiersSetters();
  const onKeyUpDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      setShift(e.shiftKey);
    },
    [setShift]
  );
  return (
    <Box pos="relative">
      <ChakraTextarea
        ref={ref}
        onPaste={stopPastePropagation}
        onKeyUp={onKeyUpDown}
        onKeyDown={onKeyUpDown}
        resize={resize}
        {...rest}
      />
      {resize !== 'none' && (
        <Box className="textarea-resize-handle" pos="absolute">
          <IoResizeSharp />
        </Box>
      )}
    </Box>
  );
});
