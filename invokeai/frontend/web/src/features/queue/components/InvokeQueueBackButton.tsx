import { Flex, Spacer } from '@chakra-ui/layout';
import { InvButton } from 'common/components/InvButton/InvButton';
import ParamIterations from 'features/parameters/components/Core/ParamIterations';
import { useQueueBack } from 'features/queue/hooks/useQueueBack';
import { useTranslation } from 'react-i18next';
import { IoSparkles } from 'react-icons/io5';

const invoke = 'Invoke';

export const InvokeQueueBackButton = () => {
  const { t } = useTranslation();
  const { queueBack, isLoading, isDisabled } = useQueueBack();

  return (
    <Flex pos="relative" h="48px">
      <InvButton
        pos="absolute"
        insetInlineStart={0}
        onClick={queueBack}
        isLoading={isLoading}
        isDisabled={isDisabled}
        rightIcon={<IoSparkles />}
        zIndex={1}
        h="full"
        w="128px"
      >
        {invoke}
        <Spacer />
      </InvButton>
      <ParamIterations />
    </Flex>
  );
};
