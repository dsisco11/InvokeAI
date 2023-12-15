import type { Meta, StoryObj } from '@storybook/react';
import { InvCollapse } from './InvCollapse';
import { InvText } from 'common/components/InvText';
import { InvCollapseProps } from 'common/components/InvCollapse/types';
import {
  InvTabs,
  InvTabList,
  InvTab,
  InvTabPanels,
  InvTabPanel,
} from 'common/components/InvTabs';

const meta: Meta<typeof InvCollapse> = {
  title: 'Primitives/InvCollapse',
  tags: ['autodocs'],
  component: InvCollapse,
};

export default meta;
type Story = StoryObj<typeof InvCollapse>;

const Component = (props: InvCollapseProps) => {
  return (
    <InvCollapse
      {...props}
      label="The Best Flavours of Banana Sushi"
      badges={['Yum', 'Gourmet', 'Barf']}
    >
      <InvTabs variant="collapse">
        <InvTabList>
          <InvTab>Caramelized</InvTab>
          <InvTab badges={[2]}>Peanut Butter</InvTab>
          <InvTab badges={[4]}>Chocolate-Dipped</InvTab>
        </InvTabList>

        <InvTabPanels>
          <InvTabPanel>
            <InvText>
              Slices of banana are caramelized with brown sugar and butter, then
              rolled in sushi rice and topped with a drizzle of caramel sauce.
              This variety offers a sweet and rich flavor, combining the
              creaminess of banana with the indulgent taste of caramel.
            </InvText>
          </InvTabPanel>
          <InvTabPanel>
            <InvText>
              A combination of creamy peanut butter and ripe banana slices,
              wrapped in sushi rice and seaweed. This sushi delivers a
              satisfying balance of nutty and sweet flavors, appealing to those
              who enjoy classic peanut butter and banana pairings.
            </InvText>
          </InvTabPanel>
          <InvTabPanel>
            <InvText>
              Banana slices are dipped in melted dark chocolate, then rolled in
              sushi rice and sprinkled with toasted sesame seeds. This type
              provides a decadent chocolate experience with a hint of nuttiness
              and the natural sweetness of banana.
            </InvText>
          </InvTabPanel>
        </InvTabPanels>
      </InvTabs>
    </InvCollapse>
  );
};

export const Default: Story = {
  render: Component,
};
