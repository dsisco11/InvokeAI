import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSwitch } from 'common/components/';
import { setShouldRandomizeSeed } from 'features/parameters/store/generationSlice';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const ParamSeedRandomize = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const shouldRandomizeSeed = useAppSelector(
    (state: RootState) => state.generation.shouldRandomizeSeed
  );

  const handleChangeShouldRandomizeSeed = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setShouldRandomizeSeed(e.target.checked)),
    [dispatch]
  );

  return (
    <InvControl label={t('common.random')} w="min-content">
      <InvSwitch
        isChecked={shouldRandomizeSeed}
        onChange={handleChangeShouldRandomizeSeed}
      />
    </InvControl>
  );
};
