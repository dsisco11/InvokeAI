import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSwitch } from 'common/components';
import { setSeamlessYAxis } from 'features/parameters/store/generationSlice';
import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(stateSelector, ({ generation }) => {
  const { seamlessYAxis } = generation;

  return { seamlessYAxis };
});

const ParamSeamlessYAxis = () => {
  const { t } = useTranslation();
  const { seamlessYAxis } = useAppSelector(selector);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSeamlessYAxis(e.target.checked));
    },
    [dispatch]
  );

  return (
    <InvControl label={t('parameters.seamlessYAxis')}>
      <InvSwitch isChecked={seamlessYAxis} onChange={handleChange} />
    </InvControl>
  );
};

export default memo(ParamSeamlessYAxis);
