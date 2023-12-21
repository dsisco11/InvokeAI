import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl } from 'common/components/InvControl/InvControl';
import { InvSelect } from 'common/components/InvSelect/InvSelect';
import type {
  InvSelectOnChange,
  InvSelectOption,
} from 'common/components/InvSelect/types';
import { setHrfMethod } from 'features/parameters/store/generationSlice';
import { isParameterHRFMethod } from 'features/parameters/types/parameterSchemas';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(stateSelector, ({ generation }) => {
  const { hrfMethod, hrfEnabled } = generation;
  return { hrfMethod, hrfEnabled };
});

const options: InvSelectOption[] = [
  { label: 'ESRGAN', value: 'ESRGAN' },
  { label: 'bilinear', value: 'bilinear' },
];

const ParamHrfMethodSelect = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { hrfMethod, hrfEnabled } = useAppSelector(selector);

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!isParameterHRFMethod(v?.value)) {
        return;
      }
      dispatch(setHrfMethod(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => options.find((o) => o.value === hrfMethod),
    [hrfMethod]
  );

  return (
    <InvControl label={t('hrf.upscaleMethod')} isDisabled={!hrfEnabled}>
      <InvSelect value={value} options={options} onChange={onChange} />
    </InvControl>
  );
};

export default memo(ParamHrfMethodSelect);
