import { Flex } from '@chakra-ui/react';
import { useAppDispatch } from 'app/store/storeHooks';
import { InvIconButton, InvControl, InvSlider } from 'common/components';
import { memo, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  LoRA,
  loraRemoved,
  loraWeightChanged,
  loraWeightReset,
} from 'features/lora/store/loraSlice';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';

type Props = {
  lora: LoRA;
};

const ParamLora = (props: Props) => {
  const dispatch = useAppDispatch();
  const { lora } = props;

  const handleChange = useCallback(
    (v: number) => {
      dispatch(loraWeightChanged({ id: lora.id, weight: v }));
    },
    [dispatch, lora.id]
  );

  const handleReset = useCallback(() => {
    dispatch(loraWeightReset(lora.id));
  }, [dispatch, lora.id]);

  const handleRemoveLora = useCallback(() => {
    dispatch(loraRemoved(lora.id));
  }, [dispatch, lora.id]);

  return (
    <IAIInformationalPopover feature="lora">
      <Flex sx={{ gap: 2.5, alignItems: 'flex-end' }}>
        <InvControl label={lora.model_name}>
          <InvSlider
            value={lora.weight}
            onChange={handleChange}
            min={-1}
            max={2}
            step={0.01}
            onReset={handleReset}
            marks={[-1, 0, 1, 2]}
            withNumberInput
            numberInputMin={-50}
            numberInputMax={50}
          />
        </InvControl>
        <InvIconButton
          size="sm"
          onClick={handleRemoveLora}
          tooltip="Remove LoRA"
          aria-label="Remove LoRA"
          icon={<FaTrash />}
          colorScheme="error"
        />
      </Flex>
    </IAIInformationalPopover>
  );
};

export default memo(ParamLora);
