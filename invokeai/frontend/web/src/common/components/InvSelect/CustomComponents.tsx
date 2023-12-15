import { Flex, Text } from '@chakra-ui/layout';
import {
  GroupBase,
  OptionProps,
  SelectComponentsConfig,
  chakraComponents,
} from 'chakra-react-select';
import { InvTooltip } from 'common/components/InvTooltip';
import { InvSelectOption } from './types';

type CustomSelectComponentConfig = SelectComponentsConfig<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
>;

type CustomOptionProps = OptionProps<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
>;

export const CustomComponents: CustomSelectComponentConfig = {
  Option: ({ children, ...props }: CustomOptionProps) => {
    if (props.data.icon) {
      return (
        <chakraComponents.Option {...props}>
          <InvTooltip label={props.data.tooltip}>
            <Flex w="full" h="full" p={1} ps={2} pe={2}>
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
          </InvTooltip>
        </chakraComponents.Option>
      );
    }

    return (
      <chakraComponents.Option {...props}>
        <InvTooltip label={props.data.tooltip}>
          <Flex w="full" h="full" flexDir="column" p={1} px={4}>
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
        </InvTooltip>
      </chakraComponents.Option>
    );
  },
};
