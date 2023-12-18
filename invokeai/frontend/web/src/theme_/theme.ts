import { ThemeOverride, ToastProviderProps } from '@chakra-ui/react';
import {
  accordionTheme,
  badgeTheme,
  buttonTheme,
  cardTheme,
  checkboxTheme,
  editableTheme,
  formLabelTheme,
  formTheme,
  headingTheme,
  inputTheme,
  menuTheme,
  modalTheme,
  numberInputTheme,
  popoverTheme,
  progressTheme,
  skeletonTheme,
  sliderTheme,
  switchTheme,
  tabsTheme,
  textTheme,
  textareaTheme,
  tooltipTheme,
} from 'common/components';
import { InvokeAIColors } from './colors/colors';
import { no_scrollbar } from './custom/scrollbar';
import { reactflowStyles } from './custom/reactflow';

export const theme: ThemeOverride = {
  config: {
    cssVarPrefix: 'invokeai',
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  layerStyles: {
    body: { bg: 'base.900', color: 'base.50' },
    first: { bg: 'base.850', color: 'base.100' },
    second: { bg: 'base.800', color: 'base.100' },
    third: { bg: 'base.750', color: 'base.100' },
    nodeBody: { bg: 'base.800', color: 'base.100' },
    nodeHeader: { bg: 'base.900', color: 'base.100' },
    nodeFooter: { bg: 'base.900', color: 'base.100' },
    danger: { color: 'error.500 !important' },
  },
  styles: {
    global: () => ({
      body: { bg: 'base.900', color: 'base.50', fontSize: 'sm' },
      '*': { ...no_scrollbar },
      ...reactflowStyles,
    }),
  },
  radii: {
    base: '12px',
    md: '4px',
    sm: '2px',
  },
  direction: 'ltr',
  fonts: {
    body: "'Inter Variable', sans-serif",
    heading: "'Inter Variable', sans-serif",
  },
  shadows: {
    accent: '0 0 10px 0 var(--invokeai-colors-accent-600)',
    accentHover: '0 0 10px 0 var(--invokeai-colors-accent-500)',
    ok: '0 0 7px var(--invokeai-colors-ok-400)',
    working: '0 0 7px var(--invokeai-colors-working-400)',
    error: '0 0 7px var(--invokeai-colors-error-400)',
    selected:
      '0px 0px 0px 1px var(--invokeai-colors-base-900), 0px 0px 0px 4px var(--invokeai-colors-accent-500)',
    hoverSelected:
      '0px 0px 0px 1px var(--invokeai-colors-base-900), 0px 0px 0px 4px var(--invokeai-colors-accent-400)',
    hoverUnselected:
      '0px 0px 0px 1px var(--invokeai-colors-base-900), 0px 0px 0px 3px var(--invokeai-colors-accent-400)',
    nodeSelected: '0 0 0 3px var(--invokeai-colors-accent-500)',
    nodeHovered: '0 0 0 2px var(--invokeai-colors-accent-400)',
    nodeHoveredSelected: '0 0 0 3px var(--invokeai-colors-accent-400)',
    nodeInProgress:
      '0 0 0 2px var(--invokeai-colors-yellow-400), 0 0 20px 2px var(--invokeai-colors-orange-700)',
  },
  colors: InvokeAIColors,
  components: {
    Accordion: accordionTheme,
    Badge: badgeTheme,
    Button: buttonTheme,
    Card: cardTheme,
    Checkbox: checkboxTheme,
    Editable: editableTheme,
    Form: formTheme,
    FormLabel: formLabelTheme,
    Heading: headingTheme,
    Input: inputTheme,
    Menu: menuTheme,
    Modal: modalTheme,
    NumberInput: numberInputTheme,
    Popover: popoverTheme,
    Progress: progressTheme,
    Skeleton: skeletonTheme,
    Slider: sliderTheme,
    Switch: switchTheme,
    Tabs: tabsTheme, // WIP
    Text: textTheme,
    Textarea: textareaTheme,
    Tooltip: tooltipTheme,
  },
};

export const TOAST_OPTIONS: ToastProviderProps = {
  defaultOptions: { isClosable: true, position: 'bottom-right' },
};
