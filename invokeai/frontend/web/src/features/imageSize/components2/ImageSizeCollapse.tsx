import { Flex } from '@chakra-ui/react';
import IAICollapse from 'common/components/IAICollapse';
import ParameterAspectRatioPreview from 'features/imageSize/components2/ParameterAspectRatioPreview';
import ParameterAspectRatioSelect from 'features/imageSize/components2/ParameterAspectRatioSelect';
import ParameterHeight from 'features/imageSize/components2/ParameterHeight';
import ParameterWidth from 'features/imageSize/components2/ParameterWidth';
import { useTranslation } from 'react-i18next';

export default function ImageSizeCollapse() {
  const { t } = useTranslation();

  return (
    <IAICollapse label={t('parameters.imageSize')} defaultIsOpen={true}>
      <Flex gap={2} alignItems="center">
        <Flex gap={2} flexDirection="column" width="full">
          <ParameterAspectRatioSelect />
          <ParameterWidth />
          <ParameterHeight />
        </Flex>
        <Flex w={32} h={32} flexShrink={0} flexGrow={0}>
          <ParameterAspectRatioPreview />
        </Flex>
      </Flex>
    </IAICollapse>
  );
}
