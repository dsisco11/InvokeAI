import { Flex, Spacer } from '@chakra-ui/layout';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvButton } from 'common/components/InvButton/InvButton';
import { InvNumberInput } from 'common/components/InvNumberInput/InvNumberInput';
import type { InvNumberInputFieldProps } from 'common/components/InvNumberInput/types';
import { InvTooltip } from 'common/components/InvTooltip/InvTooltip';
import { setIterations } from 'features/parameters/store/generationSlice';
import { useQueueBack } from 'features/queue/hooks/useQueueBack';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSparkles } from 'react-icons/io5';

import { QueueButtonTooltip } from './QueueButtonTooltip';

const invoke = 'Invoke';

const invokeButtonWidth = 128;
const iterationsInsetInlineStart = invokeButtonWidth;
const iterationsWidth = iterationsInsetInlineStart + 78;

const numberInputFieldProps: InvNumberInputFieldProps = {
  ps: `${iterationsInsetInlineStart}px`,
  borderInlineStartRadius: 'base',
  h: 'full',
  textAlign: 'center',
  fontSize: 'md',
  fontWeight: 'bold',
};

const selector = createMemoizedSelector([stateSelector], (state) => {
  const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
    state.config.sd.iterations;
  const { iterations } = state.generation;

  return {
    iterations,
    initial,
    min,
    sliderMax,
    inputMax,
    step: coarseStep,
    fineStep,
  };
});

export const InvokeQueueBackButton = () => {
  const { queueBack, isLoading, isDisabled } = useQueueBack();
  const { iterations, step, fineStep } = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(setIterations(v));
    },
    [dispatch]
  );

  return (
    <Flex pos="relative">
      <InvButton
        pos="absolute"
        insetInlineStart={0}
        onClick={queueBack}
        isLoading={isLoading}
        isDisabled={isDisabled}
        rightIcon={<IoSparkles />}
        zIndex={1}
        variant="solid"
        colorScheme="yellow"
        size="lg"
        tooltip={<QueueButtonTooltip />}
      >
        {invoke}
        <Spacer />
      </InvButton>
      <InvTooltip placement="bottom-end" label={t('parameters.iterations')}>
        <InvNumberInput
          step={step}
          fineStep={fineStep}
          min={1}
          max={999}
          onChange={handleChange}
          value={iterations}
          h="full"
          ps={0}
          w={`${iterationsWidth}px`}
          numberInputFieldProps={numberInputFieldProps}
        />
      </InvTooltip>
    </Flex>
  );
};
