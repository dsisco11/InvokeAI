import { TextInput, TextInputProps } from '@mantine/core';
import { useChakraThemeTokens } from 'common/hooks/useChakraThemeTokens';
import { useCallback } from 'react';

type IAIMantineTextInputProps = TextInputProps;

export default function IAIMantineTextInput(props: IAIMantineTextInputProps) {
  const { ...rest } = props;
  const { base100, base300, base800, base900, accent500 } =
    useChakraThemeTokens();

  const stylesFunc = useCallback(
    () => ({
      input: {
        color: base100,
        backgroundColor: base900,
        borderColor: base800,
        borderWidth: 2,
        outline: 'none',
        ':focus': {
          borderColor: accent500,
        },
      },
      label: {
        color: base300,
        fontWeight: 'normal' as const,
        marginBottom: 4,
      },
    }),
    [accent500, base100, base300, base800, base900]
  );

  return <TextInput styles={stylesFunc} {...rest} />;
}
