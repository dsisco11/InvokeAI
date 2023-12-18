import { Flex } from '@chakra-ui/react';
import {
  PositivePrompt,
  NegativePrompt,
} from 'features/parameters/components/Prompts';
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
