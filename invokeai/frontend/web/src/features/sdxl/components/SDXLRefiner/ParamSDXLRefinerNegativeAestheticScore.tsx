import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl } from 'common/components/InvControl/InvControl';
import { InvSlider } from 'common/components/InvSlider/InvSlider';
import { setRefinerNegativeAestheticScore } from 'features/sdxl/store/sdxlSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRefinerAvailable } from 'services/api/hooks/useIsRefinerAvailable';

const ParamSDXLRefinerNegativeAestheticScore = () => {
  const refinerNegativeAestheticScore = useAppSelector(
    (state) => state.sdxl.refinerNegativeAestheticScore
  );

  const isRefinerAvailable = useIsRefinerAvailable();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => dispatch(setRefinerNegativeAestheticScore(v)),
    [dispatch]
  );

  const handleReset = useCallback(
    () => dispatch(setRefinerNegativeAestheticScore(2.5)),
    [dispatch]
  );

  return (
    <InvControl
      label={t('sdxl.negAestheticScore')}
      isDisabled={!isRefinerAvailable}
    >
      <InvSlider
        min={1}
        max={10}
        step={0.5}
        fineStep={0.1}
        onChange={handleChange}
        onReset={handleReset}
        value={refinerNegativeAestheticScore}
        withNumberInput
        marks
      />
    </InvControl>
  );
};

export default memo(ParamSDXLRefinerNegativeAestheticScore);
