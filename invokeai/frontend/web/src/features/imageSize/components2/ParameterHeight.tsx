import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl } from 'common/components/InvControl';
import { InvNumberInput } from 'common/components/InvNumberInput';
import { InvSlider } from 'common/components/InvSlider';
import { heightChanged } from 'features/imageSize/store/imageSizeSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, imageSize, config }) => {
    const { min, sliderMax, inputMax, fineStep, coarseStep } = config.sd.height;
    const { model } = generation;
    const { height } = imageSize;

    const initial = ['sdxl', 'sdxl-refiner'].includes(
      model?.base_model as string
    )
      ? 1024
      : 512;

    return {
      initial,
      height,
      min,
      max: sliderMax,
      inputMax,
      step: coarseStep,
      fineStep,
    };
  }
);

const ParameterHeight = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { initial, height, min, max, inputMax, step, fineStep } =
    useAppSelector(selector);

  const onChange = useCallback(
    (v: number) => {
      dispatch(heightChanged(v));
    },
    [dispatch]
  );

  const onReset = useCallback(() => {
    dispatch(heightChanged(initial));
  }, [dispatch, initial]);

  return (
    <InvControl label={t('parameters.height')} labelW={16}>
      <InvSlider
        value={height}
        onChange={onChange}
        onReset={onReset}
        min={min}
        max={max}
        step={step}
        fineStep={fineStep}
        marks={[min, initial, max]}
      />
      <InvNumberInput
        value={height}
        onChange={onChange}
        min={min}
        max={inputMax}
        step={step}
        fineStep={fineStep}
      />
    </InvControl>
  );
};

export default memo(ParameterHeight);
