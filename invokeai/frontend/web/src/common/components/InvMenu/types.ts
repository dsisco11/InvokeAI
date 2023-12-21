import type {
  MenuProps as ChakraMenuProps,
  MenuButtonProps as ChakraMenuButtonProps,
  MenuListProps as ChakraMenuListProps,
  MenuItemProps as ChakraMenuItemProps,
  MenuItemOptionProps as ChakraMenuItemOptionProps,
  MenuGroupProps as ChakraMenuGroupProps,
  MenuOptionGroupProps as ChakraMenuOptionGroupProps,
  MenuDividerProps as ChakraMenuDividerProps,
} from '@chakra-ui/react';

export type InvMenuProps = ChakraMenuProps;
export type InvMenuButtonProps = ChakraMenuButtonProps;
export type InvMenuListProps = ChakraMenuListProps;
export type InvMenuItemProps = ChakraMenuItemProps & {
  isDestructive?: boolean;
};
export type InvMenuItemOptionProps = ChakraMenuItemOptionProps;
export type InvMenuGroupProps = ChakraMenuGroupProps;
export type InvMenuOptionGroupProps = ChakraMenuOptionGroupProps;
export type InvMenuDividerProps = ChakraMenuDividerProps;
