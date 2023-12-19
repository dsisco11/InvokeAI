import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSlider } from 'common/components';
import { setRefinerPositiveAestheticScore } from 'features/sdxl/store/sdxlSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRefinerAvailable } from 'services/api/hooks/useIsRefinerAvailable';

const ParamSDXLRefinerPositiveAestheticScore = () => {
  const refinerPositiveAestheticScore = useAppSelector(
    (state) => state.sdxl.refinerPositiveAestheticScore
  );

  const isRefinerAvailable = useIsRefinerAvailable();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => dispatch(setRefinerPositiveAestheticScore(v)),
    [dispatch]
  );

  const handleReset = useCallback(
    () => dispatch(setRefinerPositiveAestheticScore(6)),
    [dispatch]
  );

  return (
    <InvControl
      isDisabled={!isRefinerAvailable}
      label={t('sdxl.posAestheticScore')}
    >
      <InvSlider
        step={0.5}
        min={1}
        max={10}
        fineStep={0.1}
        onChange={handleChange}
        onReset={handleReset}
        value={refinerPositiveAestheticScore}
        marks
      />
    </InvControl>
  );
};

export default memo(ParamSDXLRefinerPositiveAestheticScore);
