import { NUMPY_RAND_MAX, NUMPY_RAND_MIN } from 'app/constants';
import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvNumberInput } from 'common/components';
import { setSeed } from 'features/parameters/store/generationSlice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const ParamSeedNumberInput = () => {
  const seed = useAppSelector((state: RootState) => state.generation.seed);
  const shouldRandomizeSeed = useAppSelector(
    (state: RootState) => state.generation.shouldRandomizeSeed
  );

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleChangeSeed = useCallback(
    (v: number) => dispatch(setSeed(v)),
    [dispatch]
  );

  return (
    <InvControl label={t('parameters.seed')}>
      <InvNumberInput
        step={1}
        flexGrow={1}
        min={NUMPY_RAND_MIN}
        max={NUMPY_RAND_MAX}
        isDisabled={shouldRandomizeSeed}
        onChange={handleChangeSeed}
        value={seed}
      />
    </InvControl>
  );
};
