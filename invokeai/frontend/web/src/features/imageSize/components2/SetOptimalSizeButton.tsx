import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { IconButton } from 'common/components/IconButton';
import { dimensionsReset } from 'features/imageSize/store/imageSizeSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSparkles } from 'react-icons/io5';

export const SetOptimalSizeButton = () => {
  const { t } = useTranslation();
  const optimalDimension = useAppSelector((state) =>
    state.generation.model?.base_model === 'sdxl' ? 1024 : 512
  );
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    dispatch(dimensionsReset(optimalDimension));
  }, [dispatch, optimalDimension]);

  return (
    <IconButton
      aria-label={t('parameters.lockAspectRatio')}
      onClick={onClick}
      variant="ghost"
      size="sm"
      icon={<IoSparkles />}
    />
  );
};
export default memo(SetOptimalSizeButton);
