import {
  Select as ChakraReactSelect,
  GroupBase,
  StylesConfig,
} from 'chakra-react-select';
import { CustomComponents } from './CustomComponents';
import {
  CustomChakraStylesConfig,
  InvSelectOption,
  InvSelectProps,
} from './types';
import { memo, useMemo } from 'react';

const styles: StylesConfig<InvSelectOption> = {
  menuPortal: (provided) => ({ ...provided, zIndex: 999 }),
};

export const InvSelect = memo((props: InvSelectProps) => {
  const { sx, selectRef, ...rest } = props;
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
    <ChakraReactSelect<InvSelectOption, false, GroupBase<InvSelectOption>>
      ref={selectRef}
      menuPortalTarget={document.body}
      colorScheme="base"
      selectedOptionColorScheme="base"
      components={CustomComponents}
      chakraStyles={chakraStyles}
      styles={styles}
      variant="filled"
      {...rest}
    />
  );
});

InvSelect.displayName = 'InvSelect';
