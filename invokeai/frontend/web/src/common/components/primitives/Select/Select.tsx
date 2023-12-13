import { Select as ChakraReactSelect } from 'chakra-react-select';
import { CustomComponents } from 'common/components/primitives/Select/CustomComponents';
import {
  CustomChakraStylesConfig,
  SelectProps,
} from 'common/components/primitives/Select/types';
import { useMemo } from 'react';

const Select = (props: SelectProps) => {
  const { ...rest } = props;
  const chakraStyles = useMemo<CustomChakraStylesConfig>(
    () => ({
      container: (_provided, _state) => ({
        w: 'full',
      }),
    }),
    []
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
