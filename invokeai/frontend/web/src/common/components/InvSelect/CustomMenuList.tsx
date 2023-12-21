import type { GroupBase, MenuListProps } from 'chakra-react-select';
import { chakraComponents } from 'chakra-react-select';
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import type { PropsWithChildren } from 'react';
import { memo, useEffect, useRef, useState } from 'react';

import type { InvSelectOption } from './types';

type CustomMenuListProps = MenuListProps<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
>;

OverlayScrollbars.plugin(ClickScrollPlugin);

const Scrollable = memo(
  (props: PropsWithChildren<{ viewport: HTMLDivElement | null }>) => {
    const { children, viewport } = props;

    const targetRef = useRef<HTMLDivElement>(null);
    const [initialize, getInstance] = useOverlayScrollbars({
      options: { scrollbars: { clickScroll: true } },
      defer: true,
    });

    useEffect(() => {
      if (targetRef.current && viewport) {
        initialize({
          target: targetRef.current,
          elements: {
            viewport,
          },
        });
      }
      return () => getInstance()?.destroy();
    }, [viewport, initialize, getInstance]);

    return (
      <div ref={targetRef} data-overlayscrollbars="">
        {children}
      </div>
    );
  }
);

Scrollable.displayName = 'Scrollable';

export const CustomMenuList = ({
  children,
  innerRef,
  ...other
}: CustomMenuListProps) => {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!innerRef || !(innerRef instanceof Function)) {
      return;
    }
    innerRef(viewport);
  }, [innerRef, viewport]);

  return (
    <Scrollable viewport={viewport}>
      <chakraComponents.MenuList {...other} innerRef={setViewport}>
        {children}
      </chakraComponents.MenuList>
    </Scrollable>
  );
};
