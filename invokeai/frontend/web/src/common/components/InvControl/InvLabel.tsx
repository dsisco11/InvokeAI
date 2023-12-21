import { Box, FormLabel } from '@chakra-ui/react';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';

import type { InvLabelProps } from './types';

export const InvLabel = ({ feature, labelW, children }: InvLabelProps) => {
  if (feature) {
    return (
      <IAIInformationalPopover feature={feature}>
        <Box as="span" w={labelW}>
          <FormLabel>{children}</FormLabel>
        </Box>
      </IAIInformationalPopover>
    );
  }
  return <FormLabel w={labelW}>{children}</FormLabel>;
};
