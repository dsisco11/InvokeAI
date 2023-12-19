import { Flex } from '@chakra-ui/react';
import {
  PositivePrompt,
  NegativePrompt,
} from 'features/parameters/components/Prompts';
import { SDXLConcatButton } from './SDXLConcatButton';
import { SDXLNegativeStylePrompt } from './SDXLNegativeStylePrompt';
import { SDXLPositiveStylePrompt } from './SDXLPositiveStylePrompt';
import { useAppSelector } from 'app/store/storeHooks';

export const SDXLPrompts = () => {
  const shouldConcatSDXLStylePrompt = useAppSelector(
    (state) => state.sdxl.shouldConcatSDXLStylePrompt
  );
  return (
    <Flex flexDir="column" gap={2} pos="relative">
      <PositivePrompt />
      <SDXLConcatButton />
      {!shouldConcatSDXLStylePrompt && <SDXLPositiveStylePrompt />}
      <NegativePrompt />
      {!shouldConcatSDXLStylePrompt && <SDXLNegativeStylePrompt />}
    </Flex>
  );
};
