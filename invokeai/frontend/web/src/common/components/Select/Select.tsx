import { Select as ChakraReactSelect } from 'chakra-react-select';
import { CustomComponents } from 'common/components/Select/CustomComponents';
import {
  CustomChakraStylesConfig,
  SelectProps,
} from 'common/components/Select/types';
import { useMemo } from 'react';

const Select = (props: SelectProps) => {
  const { containerSx, ...rest } = props;
  const chakraStyles = useMemo<CustomChakraStylesConfig>(
    () => ({
      container: (provided, _state) => ({ ...provided, ...containerSx }),
    }),
    [containerSx]
  );

  return (
    <ChakraReactSelect
      colorScheme="base"
      selectedOptionColorScheme="base"
      components={CustomComponents}
      chakraStyles={chakraStyles}
      {...rest}
    />
  );
};

export default Select;
