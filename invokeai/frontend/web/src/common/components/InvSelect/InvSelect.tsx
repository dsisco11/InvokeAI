import { Select as ChakraReactSelect } from 'chakra-react-select';
import { CustomComponents } from './CustomComponents';
import { CustomChakraStylesConfig, InvSelectProps } from './types';
import { useMemo } from 'react';

export const InvSelect = (props: InvSelectProps) => {
  const { sx, ...rest } = props;
  const chakraStyles = useMemo<CustomChakraStylesConfig>(
    () => ({
      container: (provided, _state) => ({ ...provided, ...sx }),
      option: (provided, _state) => ({ ...provided, p: 0 }),
      indicatorsContainer: (provided, _state) => ({
        ...provided,
        w: 8,
        alignItems: 'center',
        justifyContent: 'center',
        '> div': { p: 0, w: 'full', h: 'full', bg: 'unset' },
      }),
    }),
    [sx]
  );

  return (
    <ChakraReactSelect
      menuPortalTarget={document.body}
      colorScheme="base"
      selectedOptionColorScheme="base"
      components={CustomComponents}
      chakraStyles={chakraStyles}
      variant="filled"
      {...rest}
    />
  );
};
