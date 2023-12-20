import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useClearInvocationCache } from 'features/queue/hooks/useClearInvocationCache';
import { InvButton } from 'common/components';

const ClearInvocationCacheButton = () => {
  const { t } = useTranslation();
  const { clearInvocationCache, isDisabled, isLoading } =
    useClearInvocationCache();

  return (
    <InvButton
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={clearInvocationCache}
    >
      {t('invocationCache.clear')}
    </InvButton>
  );
};

export default memo(ClearInvocationCacheButton);
