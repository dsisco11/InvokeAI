import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { SingleValue } from 'chakra-react-select';
import { InvSelect } from 'common/components/InvSelect';
import { InvControl } from 'common/components/InvControl';
import { InvSelectOption } from 'common/components/InvSelect';
import { aspectRatioSelected } from 'features/imageSize/store/imageSizeSlice';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SwapDimensionsButton from 'features/imageSize/components/SwapDimensionsButton';
import LockAspectRatioButton from 'features/imageSize/components/LockAspectRatioButton';
import SetOptimalSizeButton from 'features/imageSize/components/SetOptimalSizeButton';
import { isAspectRatioID } from 'features/imageSize/store/types';
import { ASPECT_RATIO_OPTIONS } from 'features/imageSize/store/constants';

const ParameterAspectRatioSlider = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const aspectRatioID = useAppSelector(
    (state) => state.imageSize.aspectRatioID
  );

  const onChange = useCallback(
    (v: SingleValue<InvSelectOption>) => {
      if (!v || !isAspectRatioID(v.value)) {
        return;
      }
      dispatch(aspectRatioSelected(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => ASPECT_RATIO_OPTIONS.filter((o) => o.value === aspectRatioID)[0],
    [aspectRatioID]
  );

  return (
    <InvControl label={t('parameters.aspect')} labelW={16}>
      <InvSelect
        value={value}
        onChange={onChange}
        options={ASPECT_RATIO_OPTIONS}
        containerSx={{ minW: 48 }}
      />
      <SwapDimensionsButton />
      <LockAspectRatioButton />
      <SetOptimalSizeButton />
    </InvControl>
  );
};

export default memo(ParameterAspectRatioSlider);
