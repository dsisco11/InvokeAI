import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import type { IAIContextMenuProps } from 'common/components/IAIContextMenu';
import { IAIContextMenu } from 'common/components/IAIContextMenu';
import { InvMenuList } from 'common/components/InvMenu/InvMenuList';
import type { MouseEvent } from 'react';
import { memo, useCallback } from 'react';
import type { ImageDTO } from 'services/api/types';

import MultipleSelectionMenuItems from './MultipleSelectionMenuItems';
import SingleSelectionMenuItems from './SingleSelectionMenuItems';

type Props = {
  imageDTO: ImageDTO | undefined;
  children: IAIContextMenuProps<HTMLDivElement>['children'];
};

const selector = createMemoizedSelector([stateSelector], ({ gallery }) => {
  const selectionCount = gallery.selection.length;

  return { selectionCount };
});

const ImageContextMenu = ({ imageDTO, children }: Props) => {
  const { selectionCount } = useAppSelector(selector);

  const skipEvent = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const renderMenuFunc = useCallback(() => {
    if (!imageDTO) {
      return null;
    }

    if (selectionCount > 1) {
      return (
        <InvMenuList
          sx={{ visibility: 'visible !important' }}
          onContextMenu={skipEvent}
        >
          <MultipleSelectionMenuItems />
        </InvMenuList>
      );
    }

    return (
      <InvMenuList
        sx={{ visibility: 'visible !important' }}
        onContextMenu={skipEvent}
      >
        <SingleSelectionMenuItems imageDTO={imageDTO} />
      </InvMenuList>
    );
  }, [imageDTO, selectionCount, skipEvent]);

  return (
    <IAIContextMenu<HTMLDivElement>
      menuProps={{ size: 'sm', isLazy: true }}
      menuButtonProps={{
        bg: 'transparent',
        _hover: { bg: 'transparent' },
      }}
      renderMenu={renderMenuFunc}
    >
      {children}
    </IAIContextMenu>
  );
};

export default memo(ImageContextMenu);
