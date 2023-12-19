import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSlider } from 'common/components';
import { setRefinerSteps } from 'features/sdxl/store/sdxlSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRefinerAvailable } from 'services/api/hooks/useIsRefinerAvailable';

const ParamSDXLRefinerSteps = () => {
  const refinerSteps = useAppSelector((state) => state.sdxl.refinerSteps);
  const isRefinerAvailable = useIsRefinerAvailable();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(setRefinerSteps(v));
    },
    [dispatch]
  );
  const handleReset = useCallback(() => {
    dispatch(setRefinerSteps(20));
  }, [dispatch]);

  return (
    <InvControl label={t('sdxl.steps')} isDisabled={!isRefinerAvailable}>
      <InvSlider
        min={1}
        max={100}
        step={1}
        onChange={handleChange}
        onReset={handleReset}
        value={refinerSteps}
        marks
        withNumberInput
        numberInputMax={500}
      />
    </InvControl>
  );
};

export default memo(ParamSDXLRefinerSteps);
