import { Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import { InvCollapse } from 'common/components/InvCollapse';
import ParameterAspectRatioPreview from 'features/imageSize/components/ParameterAspectRatioPreview';
import ParameterAspectRatioSelect from 'features/imageSize/components/ParameterAspectRatioSelect';
import ParameterHeight from 'features/imageSize/components/ParameterHeight';
import ParameterWidth from 'features/imageSize/components/ParameterWidth';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(stateSelector, ({ imageSize }) => {
  const { aspectRatioID, width, height } = imageSize;
  const badges = [`${width}×${height}`, aspectRatioID];
  return { badges };
});

export default function ImageSizeCollapse() {
  const { t } = useTranslation();
  const { badges } = useAppSelector(selector);

  return (
    <InvCollapse
      label={t('parameters.imageSize')}
      defaultIsOpen={true}
      badges={badges}
    >
      <Flex p={4} gap={2} alignItems="center">
        <Flex gap={2} flexDirection="column" width="full">
          <ParameterAspectRatioSelect />
          <ParameterWidth />
          <ParameterHeight />
        </Flex>
        <Flex w={32} h={32} flexShrink={0} flexGrow={0}>
          <ParameterAspectRatioPreview />
        </Flex>
      </Flex>
    </InvCollapse>
  );
}
