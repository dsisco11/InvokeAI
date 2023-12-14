import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';
import { MenuProps } from 'common/components/Menu/types';
import MenuButton from 'common/components/Menu/MenuButton';
import MenuList from 'common/components/Menu/MenuList';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MenuItem from 'common/components/Menu/MenuItem';
import { Button } from 'common/components/Button';
import { FaCopy, FaDownload, FaTrash } from 'react-icons/fa6';

const meta: Meta<typeof Menu> = {
  title: 'Primitives/Menu',
  tags: ['autodocs'],
  component: Menu,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const Component = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FaDownload />} command="⌘S">
          Download
        </MenuItem>
        <MenuItem icon={<FaCopy />} command="⌘C">
          Create a Copy
        </MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem icon={<FaTrash />} isDestructive>
          Delete
        </MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const Default: Story = {
  render: Component,
};
