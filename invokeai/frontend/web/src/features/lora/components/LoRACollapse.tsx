import { Flex } from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import { InvSingleAccordion } from 'common/components/';
import LoRASelect from 'features/lora/components/LoRASelect';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { size } from 'lodash-es';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { LoRAList } from './LoRAList';

const LoRACollapse = () => {
  const { t } = useTranslation();
  const loraCount = useAppSelector((state) => size(state.lora.loras));
  const isLoraEnabled = useFeatureStatus('lora').isFeatureEnabled;

  if (!isLoraEnabled) {
    return null;
  }

  return (
    <InvSingleAccordion
      label={t('modelManager.loraModels')}
      defaultIsOpen={true}
      badges={loraCount ? [loraCount] : undefined}
    >
      <Flex p={4} gap={2} flexDir="column">
        <LoRASelect />
        <LoRAList />
      </Flex>
    </InvSingleAccordion>
  );
};

export default memo(LoRACollapse);
