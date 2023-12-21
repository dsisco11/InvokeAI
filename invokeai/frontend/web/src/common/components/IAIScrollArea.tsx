import type { ScrollAreaProps } from '@mantine/core';
import { ScrollArea } from '@mantine/core';

type IAIScrollArea = ScrollAreaProps;

export default function IAIScrollArea(props: IAIScrollArea) {
  const { ...rest } = props;
  return (
    <ScrollArea w="100%" {...rest}>
      {props.children}
    </ScrollArea>
  );
}
