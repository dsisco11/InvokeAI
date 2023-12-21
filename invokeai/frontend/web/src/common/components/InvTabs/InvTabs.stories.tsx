import type { Meta, StoryObj } from '@storybook/react';
import { InvTabs, InvTabList, InvTabPanels, InvTabPanel } from './wrapper';
import type { InvTabsProps } from './types';
import { InvTab } from './InvTab';

const meta: Meta<typeof InvTabs> = {
  title: 'Primitives/InvTabs',
  tags: ['autodocs'],
  component: InvTabs,
  args: {
    colorScheme: 'base',
    variant: 'collapse',
  },
};

export default meta;
type Story = StoryObj<typeof InvTabs>;

const Component = (props: InvTabsProps) => {
  return (
    <InvTabs {...props}>
      <InvTabList>
        <InvTab>One</InvTab>
        <InvTab>Two</InvTab>
        <InvTab>Three</InvTab>
      </InvTabList>

      <InvTabPanels>
        <InvTabPanel>
          <p>one!</p>
        </InvTabPanel>
        <InvTabPanel>
          <p>two!</p>
        </InvTabPanel>
        <InvTabPanel>
          <p>three!</p>
        </InvTabPanel>
      </InvTabPanels>
    </InvTabs>
  );
};

export const Default: Story = {
  render: Component,
};
