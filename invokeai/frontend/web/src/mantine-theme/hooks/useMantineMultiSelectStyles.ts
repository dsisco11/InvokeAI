import { useToken } from '@chakra-ui/react';
import { useChakraThemeTokens } from 'common/hooks/useChakraThemeTokens';
import { useCallback } from 'react';

export const useMantineMultiSelectStyles = () => {
  const {
    base50,
    base100,
    base200,
    base300,
    base400,
    base500,
    base600,
    base700,
    base800,
    base900,
    accent500,
    accent600,
  } = useChakraThemeTokens();

  const [boxShadow] = useToken('shadows', ['dark-lg']);

  const styles = useCallback(
    () => ({
      label: {
        color: base300,
      },
      separatorLabel: {
        color: base500,
        '::after': { borderTopColor: base700 },
      },
      searchInput: {
        ':placeholder': {
          color: base700,
        },
      },
      input: {
        backgroundColor: base900,
        borderWidth: '2px',
        borderColor: base800,
        color: base100,
        paddingRight: 24,
        fontWeight: 600,
        '&:hover': { borderColor: base600 },
        '&:focus': {
          borderColor: accent600,
        },
        '&:is(:focus, :hover)': {
          borderColor: base500,
        },
        '&:focus-within': {
          borderColor: accent600,
        },
        '&[data-disabled]': {
          backgroundColor: base700,
          color: base400,
          cursor: 'not-allowed',
        },
      },
      value: {
        backgroundColor: base800,
        color: base100,
        button: {
          color: base100,
        },
        '&:hover': {
          backgroundColor: base700,
          cursor: 'pointer',
        },
      },
      dropdown: {
        backgroundColor: base800,
        borderColor: base800,
        boxShadow,
      },
      item: {
        backgroundColor: base800,
        color: base200,
        padding: 6,
        '&[data-hovered]': {
          color: base100,
          backgroundColor: base700,
        },
        '&[data-active]': {
          backgroundColor: base700,
          '&:hover': {
            color: base100,
            backgroundColor: base700,
          },
        },
        '&[data-selected]': {
          backgroundColor: accent600,
          color: base100,
          fontWeight: 600,
          '&:hover': {
            backgroundColor: accent500,
            color: base50,
          },
          '&[data-disabled]': {
            color: base600,
            cursor: 'not-allowed',
          },
        },
        rightSection: {
          width: 24,
          padding: 20,
          button: {
            color: base100,
          },
        },
      },
    }),
    [
      accent500,
      accent600,
      base100,
      base200,
      base300,
      base400,
      base50,
      base500,
      base600,
      base700,
      base800,
      base900,
      boxShadow,
    ]
  );

  return styles;
};
