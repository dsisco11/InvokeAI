import { Flex } from '@chakra-ui/layout';
import { useAppSelector } from 'app/store/storeHooks';
import { InvExpander } from 'common/components/InvExpander/InvExpander';
import { InvSingleAccordion } from 'common/components/InvSingleAccordion/InvSingleAccordion';
import { InvTab } from 'common/components/InvTabs/InvTab';
import {
  InvTabList,
  InvTabPanel,
  InvTabPanels,
  InvTabs,
} from 'common/components/InvTabs/wrapper';
import { LoRAList } from 'features/lora/components/LoRAList';
import LoRASelect from 'features/lora/components/LoRASelect';
import { SyncModelsIconButton } from 'features/modelManager/components/SyncModels/SyncModelsIconButton';
import ParamCFGScale from 'features/parameters/components/Core/ParamCFGScale';
import ParamScheduler from 'features/parameters/components/Core/ParamScheduler';
import ParamSteps from 'features/parameters/components/Core/ParamSteps';
import ParamMainModelSelect from 'features/parameters/components/MainModel/ParamMainModelSelect';
import { size } from 'lodash-es';
import { useTranslation } from 'react-i18next';

export const GenerationSettingsAccordion = () => {
  const { t } = useTranslation();
  const loraCount = useAppSelector((state) => size(state.lora.loras));

  return (
    <InvSingleAccordion
      label={t('accordions.generation.title')}
      defaultIsOpen={true}
    >
      <InvTabs variant="collapse">
        <InvTabList>
          <InvTab>{t('accordions.generation.modelTab')}</InvTab>
          <InvTab badges={loraCount ? [loraCount] : undefined}>
            {t('accordions.generation.conceptsTab')}
          </InvTab>
        </InvTabList>
        <InvTabPanels>
          <InvTabPanel>
            <Flex p={4} pb={0} gap={4}>
              <ParamMainModelSelect />
              <SyncModelsIconButton />
            </Flex>
            <InvExpander>
              <Flex gap={4} p={4} pt={0} flexDir="column">
                <ParamScheduler />
                <ParamSteps />
                <ParamCFGScale />
              </Flex>
            </InvExpander>
          </InvTabPanel>
          <InvTabPanel>
            <Flex gap={4} p={4} flexDir="column">
              <LoRASelect />
              <LoRAList />
            </Flex>
          </InvTabPanel>
        </InvTabPanels>
      </InvTabs>
    </InvSingleAccordion>
  );
};
