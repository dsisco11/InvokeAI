import { ChangeEvent, useCallback } from 'react';
import { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { setShouldRandomizeSeed } from 'features/parameters/store/generationSlice';
import { useTranslation } from 'react-i18next';
import { InvControl, InvSwitch } from 'common/components/';

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
    <InvControl label={t('common.random')}>
      <InvSwitch
        isChecked={shouldRandomizeSeed}
        onChange={handleChangeShouldRandomizeSeed}
      />
    </InvControl>
  );
};
