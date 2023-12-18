import { Flex } from '@chakra-ui/react';
import { NegativePrompt } from './NegativePrompt';
import { PositivePrompt } from './PositivePrompt';

export const Prompts = () => {
  return (
    <Flex flexDir="column" gap={2}>
      <PositivePrompt />
      <NegativePrompt />
    </Flex>
  );
};
