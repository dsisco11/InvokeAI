import { Select as ChakraReactSelect } from 'chakra-react-select';
import { CustomComponents } from './CustomComponents';
import { CustomChakraStylesConfig, InvSelectProps } from './types';
import { useMemo } from 'react';

export const InvSelect = (props: InvSelectProps) => {
  const { containerSx, ...rest } = props;
  const chakraStyles = useMemo<CustomChakraStylesConfig>(
    () => ({
      container: (provided, _state) => ({ ...provided, ...containerSx }),
    }),
    [containerSx]
  );

  return (
    <ChakraReactSelect
      menuPortalTarget={document.body}
      colorScheme="base"
      selectedOptionColorScheme="base"
      components={CustomComponents}
      chakraStyles={chakraStyles}
      {...rest}
    />
  );
};
