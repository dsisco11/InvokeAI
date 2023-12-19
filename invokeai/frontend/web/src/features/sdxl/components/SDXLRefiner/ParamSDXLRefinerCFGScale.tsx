import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAINumberInput from 'common/components/IAINumberInput';
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
    <IAINumberInput
      label={t('sdxl.cfgScale')}
      step={0.5}
      min={1}
      max={200}
      onChange={handleChange}
      value={refinerCFGScale}
      isInteger={false}
      numberInputFieldProps={{ textAlign: 'center' }}
      isDisabled={!isRefinerAvailable}
    />
  );
};

export default memo(ParamSDXLRefinerCFGScale);
