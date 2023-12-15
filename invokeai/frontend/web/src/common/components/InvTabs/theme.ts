import { tabsAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const appTabsRoot = defineStyle(() => {
  return {
    display: 'flex',
    columnGap: 4,
  };
});

const appTabsTab = defineStyle(() => ({}));

const appTabsTablist = defineStyle((props) => {
  const { colorScheme: c } = props;

  return {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    color: 'base.400',
    button: {
      fontSize: 'sm',
      padding: 2,
      borderRadius: 'base',
      textShadow: mode(
        `0 0 0.3rem var(--invokeai-colors-accent-100)`,
        `0 0 0.3rem var(--invokeai-colors-accent-900)`
      )(props),
      svg: {
        fill: 'base.300',
      },
      _selected: {
        bg: 'accent.600',
        color: 'base.100',
        svg: {
          fill: `base.100`,
          filter: mode(
            `drop-shadow(0px 0px 0.3rem var(--invokeai-colors-${c}-600))`,
            `drop-shadow(0px 0px 0.3rem var(--invokeai-colors-${c}-800))`
          )(props),
        },
        _hover: {
          bg: 'accent.500',
          color: 'base.50',
          svg: {
            fill: 'base.50',
          },
        },
      },
      _hover: {
        bg: 'base.800',
        color: 'base.50',
        svg: {
          fill: `base.100`,
        },
      },
    },
  };
});

const appTabsTabpanel = defineStyle(() => ({
  padding: 0,
  height: '100%',
}));

const appTabs = definePartsStyle((props) => ({
  root: appTabsRoot(),
  tab: appTabsTab(),
  tablist: appTabsTablist(props),
  tabpanel: appTabsTabpanel(),
}));

const line = definePartsStyle(() => ({
  tab: {
    borderTopRadius: 'base',
    px: 4,
    py: 1,
    fontSize: 'sm',
    color: 'base.400',
    fontWeight: 500,
    _selected: {
      color: 'accent.400',
    },
  },
  tabpanel: {
    p: 0,
    pt: 4,
    w: 'full',
    h: 'full',
  },
  tabpanels: {
    w: 'full',
    h: 'full',
  },
}));

const TAB_INACTIVE = 'base.700';
const TAB_ACTIVE = 'base.750';

const collapse = definePartsStyle(() => ({
  indicator: {},
  tablist: {
    bg: TAB_ACTIVE,
    borderRadius: 'base',
  },
  tab: {
    flexGrow: 1,
    gap: 4,
    bg: TAB_INACTIVE,
    fontSize: 'xs',
    fontWeight: 600,
    borderInlineEnd: 1,
    borderInlineEndColor: TAB_ACTIVE,
    borderInlineEndStyle: 'solid',
    _first: {
      borderTopStartRadius: 'base',
    },
    // select the tab next to the selected tab
    '&[aria-selected="true"] + button': { borderBottomStartRadius: 'base' },
    // select the tab prev to the selected tab
    ':has(+ [aria-selected="true"])': { borderBottomEndRadius: 'base' },
    _selected: {
      bg: TAB_ACTIVE,
    },
    _last: {
      borderTopEndRadius: 'base',
      alignSelf: 'start',
    },
    transitionProperty: 'all',
  },
  tabpanels: { bg: TAB_ACTIVE, borderBottomRadius: 'base' },
  tabpanel: {},
}));

export const tabsTheme = defineMultiStyleConfig({
  variants: {
    line,
    appTabs,
    collapse,
  },
  defaultProps: {
    variant: 'line',
    colorScheme: 'accent',
  },
});
