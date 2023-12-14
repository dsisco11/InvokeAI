import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { Slider } from 'common/components/Slider';
import { Control } from 'common/components/Control';
import { widthChanged } from 'features/imageSize/store/imageSizeSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NumberInput } from 'common/components/NumberInput';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, imageSize, config }) => {
    const { min, sliderMax, inputMax, fineStep, coarseStep } = config.sd.width;
    const { model } = generation;
    const { width } = imageSize;

    const initial = ['sdxl', 'sdxl-refiner'].includes(
      model?.base_model as string
    )
      ? 1024
      : 512;

    return {
      initial,
      width,
      min,
      max: sliderMax,
      step: coarseStep,
      inputMax,
      fineStep,
    };
  }
);
const ParameterWidth = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { initial, width, min, max, inputMax, step, fineStep } =
    useAppSelector(selector);

  const onChange = useCallback(
    (v: number) => {
      dispatch(widthChanged(v));
    },
    [dispatch]
  );

  const onReset = useCallback(() => {
    dispatch(widthChanged(initial));
  }, [dispatch, initial]);

  return (
    <Control label={t('parameters.width')} labelW={16}>
      <Slider
        value={width}
        onChange={onChange}
        onReset={onReset}
        min={min}
        max={max}
        step={step}
        fineStep={fineStep}
        marks={[min, initial, max]}
      />
      <NumberInput
        value={width}
        onChange={onChange}
        min={min}
        max={inputMax}
        step={step}
        fineStep={fineStep}
      />
    </Control>
  );
};

export default memo(ParameterWidth);
