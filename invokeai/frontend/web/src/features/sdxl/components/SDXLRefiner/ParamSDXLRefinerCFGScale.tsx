import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvNumberInput } from 'common/components';
import { setRefinerCFGScale } from 'features/sdxl/store/sdxlSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRefinerAvailable } from 'services/api/hooks/useIsRefinerAvailable';

const ParamSDXLRefinerCFGScale = () => {
  const refinerCFGScale = useAppSelector((state) => state.sdxl.refinerCFGScale);
  const isRefinerAvailable = useIsRefinerAvailable();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => dispatch(setRefinerCFGScale(v)),
    [dispatch]
  );

  return (
    <InvControl label={t('sdxl.cfgScale')} isDisabled={!isRefinerAvailable}>
      <InvNumberInput
        value={refinerCFGScale}
        min={1}
        max={200}
        step={0.5}
        fineStep={0.1}
        onChange={handleChange}
      />
    </InvControl>
  );
};

export default memo(ParamSDXLRefinerCFGScale);
