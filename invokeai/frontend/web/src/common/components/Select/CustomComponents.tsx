import { Flex, Text } from '@chakra-ui/layout';
import {
  GroupBase,
  OptionProps,
  SelectComponentsConfig,
  chakraComponents,
} from 'chakra-react-select';
import { SelectOption } from 'common/components/Select/types';

type CustomSelectComponentConfig = SelectComponentsConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
>;

type CustomOptionProps = OptionProps<
  SelectOption,
  false,
  GroupBase<SelectOption>
>;

export const CustomComponents: CustomSelectComponentConfig = {
  Option: ({ children, ...props }: CustomOptionProps) => {
    if (props.data.icon) {
      return (
        <chakraComponents.Option {...props}>
          <Flex>
            <Flex ps={1} pe={3} alignItems="center" justifyContent="center">
              {props.data.icon}
            </Flex>
            <Flex flexDir="column">
              <Text>{children}</Text>
              {props.data.description && (
                <Text
                  data-option-desc
                  fontSize="xs"
                  colorScheme="base"
                  variant="subtext"
                  noOfLines={1}
                >
                  {props.data.description}
                </Text>
              )}
            </Flex>
          </Flex>
        </chakraComponents.Option>
      );
    }

    return (
      <chakraComponents.Option {...props}>
        <Flex flexDir="column">
          <Text>{children}</Text>
          {props.data.description && (
            <Text
              data-option-desc
              fontSize="xs"
              colorScheme="base"
              variant="subtext"
              noOfLines={1}
            >
              {props.data.description}
            </Text>
          )}
        </Flex>
      </chakraComponents.Option>
    );
  },
};
