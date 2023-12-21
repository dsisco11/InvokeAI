import '@fontsource-variable/inter';
import 'overlayscrollbars/overlayscrollbars.css';
import 'theme/css/overlayscrollbars.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';
import { useMantineTheme } from 'mantine-theme/theme';
import type { ReactNode } from 'react';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { theme as invokeAITheme, TOAST_OPTIONS } from 'theme/theme';

type ThemeLocaleProviderProps = {
  children: ReactNode;
};

function ThemeLocaleProvider({ children }: ThemeLocaleProviderProps) {
  const { i18n } = useTranslation();

  const direction = i18n.dir();

  const theme = useMemo(() => {
    return extendTheme({
      ...invokeAITheme,
      direction,
    });
  }, [direction]);

  useEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const mantineTheme = useMantineTheme();

  return (
    <MantineProvider theme={mantineTheme}>
      <ChakraProvider theme={theme} toastOptions={TOAST_OPTIONS}>
        {children}
      </ChakraProvider>
    </MantineProvider>
  );
}

export default memo(ThemeLocaleProvider);
