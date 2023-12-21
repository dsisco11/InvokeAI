import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSwitch } from 'common/components';
import { setHrfEnabled } from 'features/parameters/store/generationSlice';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function ParamHrfToggle() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const hrfEnabled = useAppSelector(
    (state: RootState) => state.generation.hrfEnabled
  );

  const handleHrfEnabled = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setHrfEnabled(e.target.checked)),
    [dispatch]
  );

  return (
    <InvControl label={t('hrf.enableHrf')}>
      <InvSwitch isChecked={hrfEnabled} onChange={handleHrfEnabled} />
    </InvControl>
  );
}
