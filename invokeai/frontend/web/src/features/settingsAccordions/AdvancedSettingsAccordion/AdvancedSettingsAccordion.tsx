import { Flex } from '@chakra-ui/layout';
import { InvSingleAccordion } from 'common/components/InvSingleAccordion/InvSingleAccordion';
import ParamCFGRescaleMultiplier from 'features/parameters/components/Advanced/ParamCFGRescaleMultiplier';
import ParamClipSkip from 'features/parameters/components/Advanced/ParamClipSkip';
import ParamSeamlessXAxis from 'features/parameters/components/Seamless/ParamSeamlessXAxis';
import ParamSeamlessYAxis from 'features/parameters/components/Seamless/ParamSeamlessYAxis';
import ParamVAEModelSelect from 'features/parameters/components/VAEModel/ParamVAEModelSelect';
import ParamVAEPrecision from 'features/parameters/components/VAEModel/ParamVAEPrecision';
import { useTranslation } from 'react-i18next';

export const AdvancedSettingsAccordion = () => {
  const { t } = useTranslation();

  return (
    <InvSingleAccordion
      label={t('accordions.advanced.title')}
      defaultIsOpen={true}
    >
      <Flex gap={4} alignItems="center" p={4} pb={0} flexDir="column">
        <Flex gap={4} w="full">
          <ParamVAEModelSelect />
          <ParamVAEPrecision />
        </Flex>
        <ParamClipSkip />
        <ParamCFGRescaleMultiplier />
        <Flex gap={4} w="full">
          <ParamSeamlessXAxis />
          <ParamSeamlessYAxis />
        </Flex>
      </Flex>
    </InvSingleAccordion>
  );
};
