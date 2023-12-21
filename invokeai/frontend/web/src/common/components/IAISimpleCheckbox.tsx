import { Checkbox, CheckboxProps, Text } from '@chakra-ui/react';
import { ReactElement, memo } from 'react';

type IAISimpleCheckboxProps = CheckboxProps & {
  label: string | ReactElement;
};

const IAISimpleCheckbox = (props: IAISimpleCheckboxProps) => {
  const { label, ...rest } = props;
  return (
    <Checkbox colorScheme="accent" {...rest}>
      <InvText
        sx={{
          fontSize: 'sm',
          color: 'base.200',
        }}
      >
        {label}
      </InvText>
    </Checkbox>
  );
};

export default memo(IAISimpleCheckbox);
