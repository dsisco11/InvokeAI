import { Select as ChakraReactSelect } from 'chakra-react-select';
import { CustomComponents } from 'common/components/primitives/Select/CustomComponents';
import { SelectProps } from 'common/components/primitives/Select/types';

const Select = (props: SelectProps) => {
  const { ...rest } = props;

  return (
    <ChakraReactSelect
      colorScheme="base"
      selectedOptionColorScheme="base"
      components={CustomComponents}
      {...rest}
    />
  );
};

export default Select;
