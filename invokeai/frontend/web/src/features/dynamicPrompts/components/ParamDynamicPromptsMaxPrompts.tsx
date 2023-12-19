import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { InvControl, InvSlider } from 'common/components';
import {
  maxPromptsChanged,
  maxPromptsReset,
} from 'features/dynamicPrompts/store/dynamicPromptsSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(stateSelector, (state) => {
  const { maxPrompts, combinatorial } = state.dynamicPrompts;
  const { min, sliderMax, inputMax } =
    state.config.sd.dynamicPrompts.maxPrompts;

  return {
    maxPrompts,
    min,
    sliderMax,
    inputMax,
    isDisabled: !combinatorial,
  };
});

const ParamDynamicPromptsMaxPrompts = () => {
  const { maxPrompts, min, sliderMax, inputMax, isDisabled } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(maxPromptsChanged(v));
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(maxPromptsReset());
  }, [dispatch]);

  return (
    <IAIInformationalPopover feature="dynamicPromptsMaxPrompts">
      <InvControl
        label={t('dynamicPrompts.maxPrompts')}
        isDisabled={isDisabled}
      >
        <InvSlider
          min={min}
          max={sliderMax}
          value={maxPrompts}
          onChange={handleChange}
          onReset={handleReset}
          marks
          withNumberInput
          numberInputMax={inputMax}
        />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ParamDynamicPromptsMaxPrompts);
