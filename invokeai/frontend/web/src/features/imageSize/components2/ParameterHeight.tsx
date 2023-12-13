import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { Control } from 'common/components/primitives/Control';
import { NumberInput } from 'common/components/primitives/NumberInput';
import { Slider } from 'common/components/primitives/Slider';
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
    <Control label={t('parameters.height')} labelW={16}>
      <Slider
        value={height}
        onChange={onChange}
        onReset={onReset}
        min={min}
        max={max}
        step={step}
        fineStep={fineStep}
        marks={[min, initial, max]}
      />
      <NumberInput
        value={height}
        onChange={onChange}
        min={min}
        max={inputMax}
        step={step}
        fineStep={fineStep}
      />
    </Control>
  );
};

export default memo(ParameterHeight);
