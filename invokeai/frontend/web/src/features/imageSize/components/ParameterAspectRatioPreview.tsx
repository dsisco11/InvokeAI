import { useAppSelector } from 'app/store/storeHooks';
import { AspectRatioPreview } from 'common/components/AspectRatioPreview';
import { memo } from 'react';

const ParameterAspectRatioPreview = () => {
  const width = useAppSelector((state) => state.imageSize.width);
  const height = useAppSelector((state) => state.imageSize.height);

  return <AspectRatioPreview width={width} height={height} />;
};

export default memo(ParameterAspectRatioPreview);
