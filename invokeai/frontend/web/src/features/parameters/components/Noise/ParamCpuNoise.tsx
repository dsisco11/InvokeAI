import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl } from 'common/components/InvControl/InvControl';
import { InvSwitch } from 'common/components/InvSwitch/wrapper';
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

  const handleChangeShouldUseCpuNoise = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(shouldUseCpuNoiseChanged(e.target.checked));
    },
    [dispatch]
  );

  return (
    <InvControl
      label={t('parameters.useCpuNoise')}
      w="min-content"
      feature="noiseUseCPU"
    >
      <InvSwitch
        isChecked={shouldUseCpuNoise}
        onChange={handleChangeShouldUseCpuNoise}
      />
    </InvControl>
  );
};
