import { Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import IAICollapse from 'common/components/IAICollapse';
import { InvText } from 'common/components/InvText/wrapper';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRefinerAvailable } from 'services/api/hooks/useIsRefinerAvailable';

import ParamSDXLRefinerCFGScale from './SDXLRefiner/ParamSDXLRefinerCFGScale';
import ParamSDXLRefinerModelSelect from './SDXLRefiner/ParamSDXLRefinerModelSelect';
import ParamSDXLRefinerNegativeAestheticScore from './SDXLRefiner/ParamSDXLRefinerNegativeAestheticScore';
import ParamSDXLRefinerPositiveAestheticScore from './SDXLRefiner/ParamSDXLRefinerPositiveAestheticScore';
import ParamSDXLRefinerScheduler from './SDXLRefiner/ParamSDXLRefinerScheduler';
import ParamSDXLRefinerStart from './SDXLRefiner/ParamSDXLRefinerStart';
import ParamSDXLRefinerSteps from './SDXLRefiner/ParamSDXLRefinerSteps';
import ParamUseSDXLRefiner from './SDXLRefiner/ParamUseSDXLRefiner';

const selector = createMemoizedSelector(stateSelector, (state) => {
  const { shouldUseSDXLRefiner } = state.sdxl;
  return {
    activeLabel: shouldUseSDXLRefiner ? 'Enabled' : undefined,
  };
});

const ParamSDXLRefinerCollapse = () => {
  const { activeLabel } = useAppSelector(selector);
  const { t } = useTranslation();
  const isRefinerAvailable = useIsRefinerAvailable();

  if (!isRefinerAvailable) {
    return (
      <IAICollapse label={t('sdxl.refiner')} activeLabel={activeLabel}>
        <Flex sx={{ justifyContent: 'center', p: 2 }}>
          <InvText sx={{ fontSize: 'sm', color: 'base.500' }}>
            {t('models.noRefinerModelsInstalled')}
          </InvText>
        </Flex>
      </IAICollapse>
    );
  }

  return (
    <IAICollapse label={t('sdxl.refiner')} activeLabel={activeLabel}>
      <Flex sx={{ gap: 2, flexDir: 'column' }}>
        <ParamUseSDXLRefiner />
        <ParamSDXLRefinerModelSelect />
        <Flex gap={2} flexDirection="row">
          <ParamSDXLRefinerSteps />
          <ParamSDXLRefinerCFGScale />
        </Flex>
        <ParamSDXLRefinerScheduler />
        <ParamSDXLRefinerPositiveAestheticScore />
        <ParamSDXLRefinerNegativeAestheticScore />
        <ParamSDXLRefinerStart />
      </Flex>
    </IAICollapse>
  );
};

export default memo(ParamSDXLRefinerCollapse);
