import { Flex } from '@chakra-ui/layout';
import type {
  GroupBase,
  OptionProps,
  SelectComponentsConfig,
} from 'chakra-react-select';
import { chakraComponents } from 'chakra-react-select';
import { InvText, InvTooltip } from 'common/components';
import type { InvSelectOption } from './types';

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
    delete props.innerProps.onMouseMove;
    delete props.innerProps.onMouseOver;

    if (props.data.icon) {
      return (
        <chakraComponents.Option {...props}>
          <InvTooltip label={props.data.tooltip}>
            <Flex w="full" h="full" p={1} ps={2} pe={2}>
              <Flex ps={1} pe={3} alignItems="center" justifyContent="center">
                {props.data.icon}
              </Flex>
              <Flex flexDir="column">
                <InvText>{children}</InvText>
                {props.data.description && (
                  <InvText
                    data-option-desc
                    fontSize="xs"
                    colorScheme="base"
                    variant="subtext"
                    noOfLines={1}
                  >
                    {props.data.description}
                  </InvText>
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
            <InvText>{children}</InvText>
            {props.data.description && (
              <InvText
                data-option-desc
                fontSize="xs"
                colorScheme="base"
                variant="subtext"
                noOfLines={1}
              >
                {props.data.description}
              </InvText>
            )}
          </Flex>
        </InvTooltip>
      </chakraComponents.Option>
    );
  },
};
