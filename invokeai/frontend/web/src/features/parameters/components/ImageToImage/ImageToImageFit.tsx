import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSwitch } from 'common/components';
import { setShouldFitToWidthHeight } from 'features/parameters/store/generationSlice';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function ImageToImageFit() {
  const dispatch = useAppDispatch();

  const shouldFitToWidthHeight = useAppSelector(
    (state: RootState) => state.generation.shouldFitToWidthHeight
  );

  const handleChangeFit = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setShouldFitToWidthHeight(e.target.checked));
    },
    [dispatch]
  );

  const { t } = useTranslation();

  return (
    <InvControl label={t('parameters.imageFit')}>
      <InvSwitch
        isChecked={shouldFitToWidthHeight}
        onChange={handleChangeFit}
      />
    </InvControl>
  );
}
