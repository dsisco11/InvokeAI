import { Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import { InvExpander } from 'common/components';
import { InvSingleAccordion } from 'common/components/InvSingleAccordion';
import ParamBoundingBoxHeight from 'features/parameters/components/Canvas/BoundingBox/ParamBoundingBoxHeight';
import ParamBoundingBoxWidth from 'features/parameters/components/Canvas/BoundingBox/ParamBoundingBoxWidth';
import { ParamHeight } from 'features/parameters/components/Core/ParamHeight';
import { ParamWidth } from 'features/parameters/components/Core/ParamWidth';
import { ParamSeed } from 'features/parameters/components/Seed/';
import type { InvokeTabName } from 'features/ui/store/tabMap';
import { activeTabNameSelector } from 'features/ui/store/uiSelectors';
import { useTranslation } from 'react-i18next';

import { AspectRatioPreviewWrapper } from './components/AspectRatioPreviewWrapper';
import { AspectRatioSelect } from './components/AspectRatioSelect';

const selector = createMemoizedSelector(
  [stateSelector, activeTabNameSelector],
  ({ generation }, activeTabName) => {
    const { aspectRatio, width, height } = generation;
    const badges = [`${width}×${height}`, aspectRatio.id];
    return { badges, activeTabName };
  }
);

export const ImageSettings = () => {
  const { t } = useTranslation();
  const { badges, activeTabName } = useAppSelector(selector);

  return (
    <InvSingleAccordion
      label={t('parameters.imageSize')}
      defaultIsOpen={true}
      badges={badges}
    >
      <Flex p={4} flexDir="column" gap={4}>
        <Flex gap={2} alignItems="center">
          <Flex gap={2} flexDirection="column" width="full">
            <AspectRatioSelect />
            <WidthHeight activeTabName={activeTabName} />
          </Flex>
          <Flex w={32} h={32} flexShrink={0} flexGrow={0}>
            <AspectRatioPreviewWrapper />
          </Flex>
        </Flex>
        <InvExpander>
          <Flex>
            <ParamSeed />
          </Flex>
        </InvExpander>
      </Flex>
    </InvSingleAccordion>
  );
};

const WidthHeight = (props: { activeTabName: InvokeTabName }) => {
  if (props.activeTabName === 'unifiedCanvas') {
    return (
      <>
        <ParamBoundingBoxWidth />
        <ParamBoundingBoxHeight />
      </>
    );
  }

  return (
    <>
      <ParamWidth />
      <ParamHeight />
    </>
  );
};
