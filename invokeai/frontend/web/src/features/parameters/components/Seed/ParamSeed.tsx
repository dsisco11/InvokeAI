import { Flex } from '@chakra-ui/react';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';

import { ParamSeedNumberInput } from './ParamSeedNumberInput';
import { ParamSeedRandomize } from './ParamSeedRandomize';
import { ParamSeedShuffle } from './ParamSeedShuffle';

export const ParamSeed = () => {
  return (
    <IAIInformationalPopover feature="paramSeed">
      <Flex sx={{ gap: 3, alignItems: 'flex-end' }}>
        <ParamSeedNumberInput />
        <ParamSeedShuffle />
        <ParamSeedRandomize />
      </Flex>
    </IAIInformationalPopover>
  );
};
