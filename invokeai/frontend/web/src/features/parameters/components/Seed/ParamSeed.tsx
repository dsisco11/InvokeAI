import { Flex } from '@chakra-ui/react';
import { ParamSeedNumberInput } from './ParamSeedNumberInput';
import { ParamSeedShuffle } from './ParamSeedShuffle';
import { ParamSeedRandomize } from './ParamSeedRandomize';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';

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
