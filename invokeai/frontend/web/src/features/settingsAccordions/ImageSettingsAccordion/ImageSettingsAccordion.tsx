import { Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import { InvExpander } from 'common/components/InvExpander/InvExpander';
import { InvSingleAccordion } from 'common/components/InvSingleAccordion/InvSingleAccordion';
import ParamBoundingBoxHeight from 'features/parameters/components/Canvas/BoundingBox/ParamBoundingBoxHeight';
import ParamBoundingBoxWidth from 'features/parameters/components/Canvas/BoundingBox/ParamBoundingBoxWidth';
import { ParamHeight } from 'features/parameters/components/Core/ParamHeight';
import { ParamWidth } from 'features/parameters/components/Core/ParamWidth';
import { AspectRatioPreviewWrapper } from 'features/parameters/components/ImageSize/AspectRatioPreviewWrapper';
import { AspectRatioSelect } from 'features/parameters/components/ImageSize/AspectRatioSelect';
import { ParamSeedNumberInput } from 'features/parameters/components/Seed/ParamSeedNumberInput';
import { ParamSeedRandomize } from 'features/parameters/components/Seed/ParamSeedRandomize';
import { ParamSeedShuffle } from 'features/parameters/components/Seed/ParamSeedShuffle';
import type { InvokeTabName } from 'features/ui/store/tabMap';
import { activeTabNameSelector } from 'features/ui/store/uiSelectors';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector, activeTabNameSelector],
  ({ generation }, activeTabName) => {
    const { aspectRatio, width, height, shouldRandomizeSeed } = generation;
    const badges = [`${width}×${height}`, aspectRatio.id];
    if (!shouldRandomizeSeed) {
      badges.push('Manual Seed');
    }
    return { badges, activeTabName };
  }
);

export const ImageSettingsAccordion = () => {
  const { t } = useTranslation();
  const { badges, activeTabName } = useAppSelector(selector);

  return (
    <InvSingleAccordion
      label={t('accordions.image.title')}
      defaultIsOpen={true}
      badges={badges}
    >
      <Flex gap={4} alignItems="center" p={4}>
        <Flex gap={2} flexDirection="column" width="full">
          <AspectRatioSelect />
          <WidthHeight activeTabName={activeTabName} />
        </Flex>
        <Flex w={32} h={32} flexShrink={0} flexGrow={0}>
          <AspectRatioPreviewWrapper />
        </Flex>
      </Flex>
      <InvExpander>
        <Flex gap={4} p={4} pb={0}>
          <ParamSeedNumberInput />
          <ParamSeedShuffle />
          <ParamSeedRandomize />
        </Flex>
      </InvExpander>
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
