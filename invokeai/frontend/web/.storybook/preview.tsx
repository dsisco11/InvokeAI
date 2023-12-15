import { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import ThemeLocaleProvider from '../src/app/components/ThemeLocaleProvider2';
import { createStore } from '../src/app/store/store';
import { Provider } from 'react-redux';
import { $baseUrl } from '../src/app/store/nanostores/baseUrl';
import { useGlobalModifiersInit } from '../src/common/hooks/useGlobalModifiers';
// TODO: Disabled for IDE performance issues with our translation JSON
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import translationEN from '../public/locales/en.json';
import { Container } from '@chakra-ui/react';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: { translation: translationEN },
  },
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

const store = createStore(undefined, false);
$baseUrl.set('http://localhost:9090');

const preview: Preview = {
  decorators: [
    (Story) => {
      useGlobalModifiersInit();
      return (
        <Provider store={store}>
          <ThemeLocaleProvider>
            <Container maxW="container.sm">
              <Story />
            </Container>
          </ThemeLocaleProvider>
        </Provider>
      );
    },
  ],
  parameters: {
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
