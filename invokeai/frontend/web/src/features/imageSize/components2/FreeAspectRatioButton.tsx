import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { Button } from 'common/components/Button';
import { isFreeChanged } from 'features/imageSize/store/imageSizeSlice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function FreeAspectRatioButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isFree = useAppSelector((state) => state.imageSize.isFree);
  const onClick = useCallback(() => {
    dispatch(isFreeChanged(!isFree));
  }, [dispatch, isFree]);
  return (
    <Button
      isChecked={isFree}
      onClick={onClick}
      variant={isFree ? 'outline' : 'ghost'}
      size="sm"
    >
      {t('common.free')}
    </Button>
  );
}
