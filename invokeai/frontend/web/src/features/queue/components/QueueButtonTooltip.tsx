import { Divider, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import { InvText } from 'common/components/InvText/wrapper';
import { useIsReadyToEnqueue } from 'common/hooks/useIsReadyToEnqueue';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useEnqueueBatchMutation } from 'services/api/endpoints/queue';
import { useBoardName } from 'services/api/hooks/useBoardName';

const StyledDivider = () => <Divider opacity={0.2} borderColor="base.900" />;

const tooltipSelector = createMemoizedSelector(
  [stateSelector],
  ({ gallery }) => {
    const { autoAddBoardId } = gallery;
    return {
      autoAddBoardId,
    };
  }
);

type Props = {
  prepend?: boolean;
};

export const QueueButtonTooltip = memo(({ prepend = false }: Props) => {
  const { t } = useTranslation();
  const { isReady, reasons } = useIsReadyToEnqueue();
  const { autoAddBoardId } = useAppSelector(tooltipSelector);
  const autoAddBoardName = useBoardName(autoAddBoardId);
  const [_, { isLoading }] = useEnqueueBatchMutation({
    fixedCacheKey: 'enqueueBatch',
  });

  const label = useMemo(() => {
    if (isLoading) {
      return t('queue.enqueueing');
    }
    if (isReady) {
      if (prepend) {
        return t('queue.queueFront');
      }
      return t('queue.queueBack');
    }
    return t('queue.notReady');
  }, [isLoading, isReady, prepend, t]);

  return (
    <Flex flexDir="column" gap={1}>
      <InvText fontWeight={600}>{label}</InvText>
      {reasons.length > 0 && (
        <UnorderedList>
          {reasons.map((reason, i) => (
            <ListItem key={`${reason}.${i}`}>
              <InvText fontWeight={400}>{reason}</InvText>
            </ListItem>
          ))}
        </UnorderedList>
      )}
      <StyledDivider />
      <InvText fontWeight={400} fontStyle="oblique 10deg">
        {t('parameters.invoke.addingImagesTo')}{' '}
        <InvText as="span" fontWeight={600}>
          {autoAddBoardName || t('boards.uncategorized')}
        </InvText>
      </InvText>
    </Flex>
  );
});

QueueButtonTooltip.displayName = 'QueueButtonTooltip';
