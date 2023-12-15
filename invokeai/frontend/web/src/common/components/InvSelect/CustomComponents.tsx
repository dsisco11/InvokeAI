import { Flex, Text } from '@chakra-ui/layout';
import {
  GroupBase,
  IndicatorsContainerProps,
  OptionProps,
  SelectComponentsConfig,
  chakraComponents,
} from 'chakra-react-select';
import { InvTooltip } from 'common/components/InvTooltip';
import { InvSelectOption } from './types';
import { CloseIcon, Icon as ChakraIcon } from '@chakra-ui/icons';
import { FaChevronDown } from 'react-icons/fa6';

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
type CustomIndicatorsContainerProps = IndicatorsContainerProps<
  InvSelectOption,
  false,
  GroupBase<InvSelectOption>
>;

export const CustomComponents: CustomSelectComponentConfig = {
  ClearIndicator: (props) => (
    <chakraComponents.ClearIndicator {...props}>
      <CloseIcon boxSize={4} />
    </chakraComponents.ClearIndicator>
  ),
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <ChakraIcon as={FaChevronDown} boxSize={2} />
    </chakraComponents.DropdownIndicator>
  ),
  IndicatorsContainer: ({
    children,
    ...props
  }: CustomIndicatorsContainerProps) => (
    <chakraComponents.IndicatorsContainer {...props}>
      <Flex
        w={8}
        alignItems="center"
        justifyContent="center"
        sx={{ '> div': { p: 0, w: 'full', h: 'full', bg: 'unset' } }}
      >
        {children}
      </Flex>
    </chakraComponents.IndicatorsContainer>
  ),
  Option: ({ children, ...props }: CustomOptionProps) => {
    if (props.data.icon) {
      return (
        <chakraComponents.Option {...props}>
          <InvTooltip label={props.data.tooltip}>
            <Flex w="full" h="full" p={1} px={2}>
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
          <Flex w="full" h="full" flexDir="column" p={1} px={2}>
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
