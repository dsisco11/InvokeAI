import { Flex, FormLabel } from '@chakra-ui/react';
import { createSelector } from '@reduxjs/toolkit';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';

import type { InvLabelProps } from './types';

const selector = createSelector(
  stateSelector,
  ({ system }) => system.shouldEnableInformationalPopovers
);

export const InvLabel = ({
  feature,
  labelW,
  renderInfoPopoverInPortal,
  children,
}: InvLabelProps) => {
  const shouldEnableInformationalPopovers = useAppSelector(selector);
  if (feature && shouldEnableInformationalPopovers) {
    return (
      <IAIInformationalPopover
        feature={feature}
        inPortal={renderInfoPopoverInPortal}
      >
        <Flex
          as="span"
          flexShrink={0}
          flexGrow={0}
          w={labelW}
          h="full"
          alignItems="center"
        >
          <FormLabel>{children}</FormLabel>
        </Flex>
      </IAIInformationalPopover>
    );
  }
  return <FormLabel w={labelW}>{children}</FormLabel>;
};
