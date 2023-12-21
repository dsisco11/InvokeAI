import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl } from 'common/components/InvControl/InvControl';
import { InvSwitch } from 'common/components/InvSwitch/wrapper';
import { setShouldUseSDXLRefiner } from 'features/sdxl/store/sdxlSlice';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRefinerAvailable } from 'services/api/hooks/useIsRefinerAvailable';

export default function ParamUseSDXLRefiner() {
  const shouldUseSDXLRefiner = useAppSelector(
    (state: RootState) => state.sdxl.shouldUseSDXLRefiner
  );
  const isRefinerAvailable = useIsRefinerAvailable();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleUseSDXLRefinerChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setShouldUseSDXLRefiner(e.target.checked));
    },
    [dispatch]
  );

  return (
    <InvControl label={t('sdxl.useRefiner')} isDisabled={!isRefinerAvailable}>
      <InvSwitch
        isChecked={shouldUseSDXLRefiner}
        onChange={handleUseSDXLRefinerChange}
      />
    </InvControl>
  );
}
