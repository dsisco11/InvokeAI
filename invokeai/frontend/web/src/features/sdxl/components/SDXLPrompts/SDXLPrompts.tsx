import { Flex } from '@chakra-ui/react';
import { SDXLConcatButton } from './SDXLConcatButton';
import { ParamSDXLNegativeStylePrompt } from './ParamSDXLNegativeStylePrompt';
import { ParamSDXLPositiveStylePrompt } from './ParamSDXLPositiveStylePrompt';
import { useAppSelector } from 'app/store/storeHooks';
import { ParamPositivePrompt } from 'features/parameters/components/Core/ParamPositivePrompt';
import { ParamNegativePrompt } from 'features/parameters/components/Core/ParamNegativePrompt';

export const SDXLPrompts = () => {
  const shouldConcatSDXLStylePrompt = useAppSelector(
    (state) => state.sdxl.shouldConcatSDXLStylePrompt
  );
  return (
    <Flex flexDir="column" gap={2} pos="relative">
      <ParamPositivePrompt />
      <SDXLConcatButton />
      {!shouldConcatSDXLStylePrompt && <ParamSDXLPositiveStylePrompt />}
      <ParamNegativePrompt />
      {!shouldConcatSDXLStylePrompt && <ParamSDXLNegativeStylePrompt />}
    </Flex>
  );
};
