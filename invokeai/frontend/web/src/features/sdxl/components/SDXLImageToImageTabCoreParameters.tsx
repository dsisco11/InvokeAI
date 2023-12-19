import { Box, Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import IAICollapse from 'common/components/IAICollapse';
import ParamCFGScale from 'features/parameters/components/Core/ParamCFGScale';
import ParamIterations from 'features/parameters/components/Core/ParamIterations';
import ParamModelandVAEandScheduler from 'features/parameters/components/Core/ParamModelandVAEandScheduler';
import ParamSteps from 'features/parameters/components/Core/ParamSteps';
import ImageToImageFit from 'features/parameters/components/ImageToImage/ImageToImageFit';
import { ParamSeed } from 'features/parameters/components/Seed/';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ParamSDXLImg2ImgDenoisingStrength from './ParamSDXLImg2ImgDenoisingStrength';

const selector = createMemoizedSelector([stateSelector], ({ generation }) => {
  const { shouldRandomizeSeed } = generation;

  const activeLabel = !shouldRandomizeSeed ? 'Manual Seed' : undefined;

  return { activeLabel };
});

const SDXLImageToImageTabCoreParameters = () => {
  const { t } = useTranslation();
  const { activeLabel } = useAppSelector(selector);

  return (
    <IAICollapse
      label={t('parameters.general')}
      activeLabel={activeLabel}
      defaultIsOpen={true}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Flex gap={3}>
          <ParamIterations />
          <ParamSteps />
          <ParamCFGScale />
        </Flex>
        <ParamModelandVAEandScheduler />
        <Box pt={2}>
          <ParamSeed />
        </Box>
        <ParamSDXLImg2ImgDenoisingStrength />
        <ImageToImageFit />
      </Flex>
    </IAICollapse>
  );
};

export default memo(SDXLImageToImageTabCoreParameters);
