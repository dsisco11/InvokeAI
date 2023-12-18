import { Flex } from '@chakra-ui/react';
import { PositivePrompt } from 'features/parameters/components/PositivePrompt';
import { NegativePrompt } from 'features/parameters/components/NegativePrompt';
import { SDXLConcatButton } from './SDXLConcatButton';
import { SDXLNegativeStylePrompt } from './SDXLNegativeStylePrompt';
import { SDXLPositiveStylePrompt } from './SDXLPositiveStylePrompt';

export const SDXLPrompts = () => {
  return (
    <Flex flexDir="column" gap={2} pos="relative">
      <PositivePrompt />
      <SDXLConcatButton />
      <SDXLPositiveStylePrompt />
      <NegativePrompt />
      <SDXLNegativeStylePrompt />
    </Flex>
  );
};
