import { ThemeOverride, ToastProviderProps } from '@chakra-ui/react';
import { accordionTheme } from 'common/components/Accordion/theme';
import { buttonTheme } from 'common/components/Button';
import { checkboxTheme } from 'common/components/Checkbox/theme';
import { formLabelTheme, formTheme } from 'common/components/Control';
import { menuTheme } from 'common/components/Menu/theme';
import { numberInputTheme } from 'common/components/NumberInput';
import { sliderTheme } from 'common/components/Slider';
import { switchTheme } from 'common/components/Switch';
import { textTheme } from 'common/components/Text';
import { textareaTheme } from 'common/components/Textarea';
import { tooltipTheme } from 'common/components/Tooltip';
import { headingTheme } from 'theme/components/heading';
import { InvokeAIColors } from './colors/colors';
import { editableTheme } from './components/editable';
import { inputTheme } from './components/input';
import { modalTheme } from './components/modal';
import { popoverTheme } from './components/popover';
import { progressTheme } from './components/progress';
import { no_scrollbar } from './components/scrollbar';
import { skeletonTheme } from './components/skeleton';
import { tabsTheme } from './components/tabs';
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
      body: { bg: 'base.900', color: 'base.50' },
      '*': { ...no_scrollbar },
      ...reactflowStyles,
    }),
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
    Accordion: accordionTheme, // done
    Button: buttonTheme, // done
    Checkbox: checkboxTheme, // done
    Editable: editableTheme,
    Form: formTheme, // done
    FormLabel: formLabelTheme, // done
    Heading: headingTheme,
    Input: inputTheme,
    Menu: menuTheme, // done
    Modal: modalTheme,
    NumberInput: numberInputTheme, // done
    Popover: popoverTheme,
    Progress: progressTheme,
    Skeleton: skeletonTheme,
    Slider: sliderTheme, // done
    Switch: switchTheme, // done
    Tabs: tabsTheme,
    Text: textTheme, // done
    Textarea: textareaTheme, // done
    Tooltip: tooltipTheme, // done
  },
};

export const TOAST_OPTIONS: ToastProviderProps = {
  defaultOptions: { isClosable: true, position: 'bottom-right' },
};
