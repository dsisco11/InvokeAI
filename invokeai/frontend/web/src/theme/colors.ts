import type { InvokeAIThemeColors } from 'theme/themeTypes';
import { generateColorPalette } from 'theme/util/generateColorPalette';

const BASE = { H: 220, S: 16 };
const ACCENT = { H: 250, S: 42 };
const WORKING = { H: 47, S: 42 };
const GOLD = { H: 40, S: 70 };
const WARNING = { H: 28, S: 42 };
const OK = { H: 113, S: 42 };
const ERROR = { H: 0, S: 42 };

export const InvokeAIColors: InvokeAIThemeColors = {
  base: generateColorPalette(BASE.H, BASE.S),
  baseAlpha: generateColorPalette(BASE.H, BASE.S, true),
  accent: generateColorPalette(ACCENT.H, ACCENT.S),
  accentAlpha: generateColorPalette(ACCENT.H, ACCENT.S, true),
  working: generateColorPalette(WORKING.H, WORKING.S),
  workingAlpha: generateColorPalette(WORKING.H, WORKING.S, true),
  gold: generateColorPalette(GOLD.H, GOLD.S),
  goldAlpha: generateColorPalette(GOLD.H, GOLD.S, true),
  warning: generateColorPalette(WARNING.H, WARNING.S),
  warningAlpha: generateColorPalette(WARNING.H, WARNING.S, true),
  ok: generateColorPalette(OK.H, OK.S),
  okAlpha: generateColorPalette(OK.H, OK.S, true),
  error: generateColorPalette(ERROR.H, ERROR.S),
  errorAlpha: generateColorPalette(ERROR.H, ERROR.S, true),
};

export const layerStyleBody = {
  bg: 'black',
  color: 'base.50',
} as const;
export const layerStyleFirst = {
  bg: 'base.900',
  color: 'base.50',
} as const;
export const layerStyleSecond = {
  bg: 'base.800',
  color: 'base.50',
} as const;
export const layerStyleThird = {
  bg: 'base.700',
  color: 'base.50',
} as const;
export const layerStyleNodeBody = {
  bg: 'base.800',
  color: 'base.100',
} as const;
export const layerStyleNodeHeader = {
  bg: 'base.900',
  color: 'base.100',
} as const;
export const layerStyleNodeFooter = {
  bg: 'base.900',
  color: 'base.100',
} as const;
export const layerStyleDanger = {
  color: 'error.500 !important',
} as const;
