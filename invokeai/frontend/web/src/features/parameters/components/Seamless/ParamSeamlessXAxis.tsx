import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSwitch } from 'common/components';
import { setSeamlessXAxis } from 'features/parameters/store/generationSlice';
import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(stateSelector, ({ generation }) => {
  const { seamlessXAxis } = generation;

  return { seamlessXAxis };
});

const ParamSeamlessXAxis = () => {
  const { t } = useTranslation();
  const { seamlessXAxis } = useAppSelector(selector);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSeamlessXAxis(e.target.checked));
    },
    [dispatch]
  );

  return (
    <InvControl label={t('parameters.seamlessXAxis')}>
      <InvSwitch isChecked={seamlessXAxis} onChange={handleChange} />
    </InvControl>
  );
};

export default memo(ParamSeamlessXAxis);
