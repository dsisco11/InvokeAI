import {
  MenuProps as ChakraMenuProps,
  MenuButtonProps as ChakraMenuButtonProps,
  MenuListProps as ChakraMenuListProps,
  MenuItemProps as ChakraMenuItemProps,
  MenuItemOptionProps as ChakraMenuItemOptionProps,
  MenuGroupProps as ChakraMenuGroupProps,
  MenuOptionGroupProps as ChakraMenuOptionGroupProps,
  MenuDividerProps as ChakraMenuDividerProps,
} from '@chakra-ui/react';

export type MenuProps = ChakraMenuProps;
export type MenuButtonProps = ChakraMenuButtonProps;
export type MenuListProps = ChakraMenuListProps;
export type MenuItemProps = ChakraMenuItemProps & {
  isDestructive?: boolean;
};
export type MenuItemOptionProps = ChakraMenuItemOptionProps;
export type MenuGroupProps = ChakraMenuGroupProps;
export type MenuOptionGroupProps = ChakraMenuOptionGroupProps;
export type MenuDividerProps = ChakraMenuDividerProps;
