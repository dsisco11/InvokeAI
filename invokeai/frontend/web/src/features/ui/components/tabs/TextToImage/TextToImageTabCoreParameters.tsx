import { Box, Flex } from '@chakra-ui/react';
import IAICollapse from 'common/components/IAICollapse';
import ParamCFGScale from 'features/parameters/components/Core/ParamCFGScale';
import ParamIterations from 'features/parameters/components/Core/ParamIterations';
import ParamModelandVAEandScheduler from 'features/parameters/components/Core/ParamModelandVAEandScheduler';
import ParamSteps from 'features/parameters/components/Core/ParamSteps';
import { ParamSeed } from 'features/parameters/components/Seed/ParamSeed';
import { useCoreParametersCollapseLabel } from 'features/parameters/hooks/useCoreParametersCollapseLabel';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const TextToImageTabCoreParameters = () => {
  const { t } = useTranslation();
  const { iterationsAndSeedLabel } = useCoreParametersCollapseLabel();

  return (
    <IAICollapse
      label={t('parameters.general')}
      activeLabel={iterationsAndSeedLabel}
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
      </Flex>
    </IAICollapse>
  );
};

export default memo(TextToImageTabCoreParameters);
