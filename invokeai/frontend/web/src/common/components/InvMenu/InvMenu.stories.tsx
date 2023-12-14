import { ChevronDownIcon } from '@chakra-ui/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { InvButton } from 'common/components/InvButton';
import { FaCopy, FaDownload, FaTrash } from 'react-icons/fa6';
import { InvMenu } from './InvMenu';
import { InvMenuButton } from './InvMenuButton';
import { InvMenuList } from './InvMenuList';
import { InvMenuItem } from './InvMenuItem';
import { InvMenuProps } from './types';

const meta: Meta<typeof InvMenu> = {
  title: 'Primitives/InvMenu',
  tags: ['autodocs'],
  component: InvMenu,
  args: {
    colorScheme: 'base',
  },
};

export default meta;
type Story = StoryObj<typeof InvMenu>;

const Component = (props: InvMenuProps) => {
  return (
    <InvMenu {...props}>
      <InvMenuButton as={InvButton} rightIcon={<ChevronDownIcon />}>
        Actions
      </InvMenuButton>
      <InvMenuList>
        <InvMenuItem icon={<FaDownload />} command="⌘S">
          Download
        </InvMenuItem>
        <InvMenuItem icon={<FaCopy />} command="⌘C">
          Create a Copy
        </InvMenuItem>
        <InvMenuItem>Mark as Draft</InvMenuItem>
        <InvMenuItem icon={<FaTrash />} isDestructive>
          Delete
        </InvMenuItem>
        <InvMenuItem>Attend a Workshop</InvMenuItem>
      </InvMenuList>
    </InvMenu>
  );
};

export const Default: Story = {
  render: Component,
};
