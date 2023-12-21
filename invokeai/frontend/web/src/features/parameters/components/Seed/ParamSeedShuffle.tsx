import { NUMPY_RAND_MAX, NUMPY_RAND_MIN } from 'app/constants';
import type { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvIconButton, InvTooltip } from 'common/components/';
import randomInt from 'common/util/randomInt';
import { setSeed } from 'features/parameters/store/generationSlice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRandom } from 'react-icons/fa';

export const ParamSeedShuffle = () => {
  const dispatch = useAppDispatch();
  const shouldRandomizeSeed = useAppSelector(
    (state: RootState) => state.generation.shouldRandomizeSeed
  );
  const { t } = useTranslation();

  const handleClickRandomizeSeed = useCallback(
    () => dispatch(setSeed(randomInt(NUMPY_RAND_MIN, NUMPY_RAND_MAX))),
    [dispatch]
  );

  return (
    <InvTooltip label={t('parameters.shuffle')}>
      <InvIconButton
        size="sm"
        isDisabled={shouldRandomizeSeed}
        aria-label={t('parameters.shuffle')}
        onClick={handleClickRandomizeSeed}
        icon={<FaRandom />}
      />
    </InvTooltip>
  );
};
