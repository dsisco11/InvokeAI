import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { SingleValue } from 'chakra-react-select';
import { InvSelect } from 'common/components/InvSelect';
import { InvControl } from 'common/components/InvControl';
import { InvSelectOption } from 'common/components/InvSelect';
import { ASPECT_RATIO_MAP } from 'features/imageSize/store/constants';
import {
  aspectRatioIndexChanged,
  isFreeChanged,
} from 'features/imageSize/store/imageSizeSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SwapDimensionsButton from 'features/imageSize/components2/SwapDimensionsButton';
import LockAspectRatioButton from 'features/imageSize/components2/LockAspectRatioButton';
import SetOptimalSizeButton from 'features/imageSize/components2/SetOptimalSizeButton';

const options: InvSelectOption[] = [{ label: 'Free', value: 'free' }].concat(
  ASPECT_RATIO_MAP.map((r, i) => ({
    label: r.label,
    value: String(i),
  }))
);

const ParameterAspectRatioSlider = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const aspectRatioIndex = useAppSelector(
    (state) => state.imageSize.aspectRatioIndex
  );
  const isFree = useAppSelector((state) => state.imageSize.isFree);

  const onChange = useCallback(
    (v: SingleValue<InvSelectOption>) => {
      if (!v) {
        return;
      }
      if (v.value === 'free') {
        dispatch(isFreeChanged(true));
        return;
      }
      dispatch(aspectRatioIndexChanged(Number(v.value)));
    },
    [dispatch]
  );

  return (
    <InvControl label={t('parameters.aspect')} labelW={16}>
      <InvSelect
        value={isFree ? options[0] : options[aspectRatioIndex]}
        onChange={onChange}
        options={options}
        containerSx={{ minW: 48 }}
      />
      <SwapDimensionsButton />
      <LockAspectRatioButton />
      <SetOptimalSizeButton />
    </InvControl>
  );
};

export default memo(ParameterAspectRatioSlider);
