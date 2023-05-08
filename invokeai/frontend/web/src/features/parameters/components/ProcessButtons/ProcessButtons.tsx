import { Flex } from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import { activeTabNameSelector } from 'features/ui/store/uiSelectors';
import CancelButton from './CancelButton';
import InvokeButton from './InvokeButton';
import LoopbackButton from './Loopback';
import IAICheckbox from 'common/components/IAICheckbox';
import IAISwitch from 'common/components/IAISwitch';

/**
 * Buttons to start and cancel image generation.
 */
const ProcessButtons = () => {
  const activeTabName = useAppSelector(activeTabNameSelector);

  return (
    <Flex gap={2}>
      <InvokeButton />
      {/* {activeTabName === 'img2img' && <LoopbackButton />} */}
      <CancelButton />
    </Flex>
  );
};

export default ProcessButtons;
