import { Flex } from '@chakra-ui/layout';
import { useAppDispatch } from 'app/store/storeHooks';
import { InvButton } from 'common/components/InvButton/InvButton';
import { InvIconButton } from 'common/components/InvIconButton/InvIconButton';
import { useGetNodesNeedUpdate } from 'features/nodes/hooks/useGetNodesNeedUpdate';
import { updateAllNodesRequested } from 'features/nodes/store/actions';
import { addNodePopoverOpened } from 'features/nodes/store/nodesSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle, FaPlus } from 'react-icons/fa';

const TopLeftPanel = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nodesNeedUpdate = useGetNodesNeedUpdate();
  const handleOpenAddNodePopover = useCallback(() => {
    dispatch(addNodePopoverOpened());
  }, [dispatch]);
  const handleClickUpdateNodes = useCallback(() => {
    dispatch(updateAllNodesRequested());
  }, [dispatch]);

  return (
    <Flex sx={{ gap: 2, position: 'absolute', top: 2, insetInlineStart: 2 }}>
      <InvIconButton
        tooltip={t('nodes.addNodeToolTip')}
        aria-label={t('nodes.addNode')}
        icon={<FaPlus />}
        onClick={handleOpenAddNodePopover}
      />
      {nodesNeedUpdate && (
        <InvButton
          leftIcon={<FaExclamationTriangle />}
          onClick={handleClickUpdateNodes}
        >
          {t('nodes.updateAllNodes')}
        </InvButton>
      )}
    </Flex>
  );
};

export default memo(TopLeftPanel);
