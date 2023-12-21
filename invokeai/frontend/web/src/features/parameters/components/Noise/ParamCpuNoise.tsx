import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { InvControl, InvSwitch } from 'common/components';
import { shouldUseCpuNoiseChanged } from 'features/parameters/store/generationSlice';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const ParamCpuNoiseToggle = () => {
  const dispatch = useAppDispatch();
  const shouldUseCpuNoise = useAppSelector(
    (state) => state.generation.shouldUseCpuNoise
  );
  const { t } = useTranslation();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(shouldUseCpuNoiseChanged(e.target.checked));
    },
    [dispatch]
  );

  return (
    <IAIInformationalPopover feature="noiseUseCPU">
      <InvControl label={t('parameters.useCpuNoise')}>
        <InvSwitch isChecked={shouldUseCpuNoise} onChange={handleChange} />
      </InvControl>
    </IAIInformationalPopover>
  );
};
