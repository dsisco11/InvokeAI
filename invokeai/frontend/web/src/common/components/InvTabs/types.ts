import type {
  TabProps as ChakraTabProps,
  TabsProps as InvTabsProps,
  TabListProps as InvTabListProps,
  TabPanelsProps as InvTabPanelsProps,
  TabPanelProps as InvTabPanelProps,
} from '@chakra-ui/react';

export type {
  InvTabsProps,
  InvTabListProps,
  InvTabPanelsProps,
  InvTabPanelProps,
};

export type InvTabProps = ChakraTabProps & {
  badges?: (string | number)[];
};
