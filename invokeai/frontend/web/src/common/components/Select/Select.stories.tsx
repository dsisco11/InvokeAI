import type { Meta, StoryObj } from '@storybook/react';
import Select from 'common/components/Select/Select';
import { SelectOption, SelectProps } from 'common/components/Select/types';
import { omit } from 'lodash-es';

const SELECT_STORY_OPTIONS: SelectOption[] = [
  {
    value: 'chocolate',
    label: 'Chocolate',
    description:
      'Chocolate is a usually sweet, brown food preparation of roasted and ground cacao seeds. It is made in the form of a liquid, paste, or in a block, or used as a flavoring ingredient in other foods.',
    icon: '🍫',
  },
  {
    value: 'strawberry',
    label: 'Strawberry',
    description:
      'Strawberries are bright red fruits with a sweet yet slightly tart taste. They are often enjoyed fresh but are also used in a variety of desserts and sauces.',
    icon: '🍓',
  },
  {
    value: 'vanilla',
    label: 'Vanilla',
    description:
      'Vanilla is a popular flavor derived from orchids of the genus Vanilla. It is used in a variety of desserts and beverages for its sweet and creamy flavor.',
    icon: '🍦',
  },
];

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  tags: ['autodocs'],
  component: Select,
  args: {
    options: SELECT_STORY_OPTIONS,
  },
  argTypes: {
    options: {
      control: {
        type: 'select',
      },
      options: ['WithIcon', 'WithDescription', 'OnlyLabel'],
      mapping: {
        WithIcon: SELECT_STORY_OPTIONS,
        WithDescription: SELECT_STORY_OPTIONS.map((o) => omit(o, 'icon')),
        OnlyLabel: SELECT_STORY_OPTIONS.map((o) =>
          omit(o, ['icon', 'description'])
        ),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const Component = (props: SelectProps) => {
  return <Select {...props} defaultValue={SELECT_STORY_OPTIONS[0]} />;
};

export const Default: Story = {
  render: Component,
};
