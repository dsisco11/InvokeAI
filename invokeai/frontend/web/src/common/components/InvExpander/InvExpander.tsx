import { Divider, Flex } from '@chakra-ui/layout';
import { Collapse, Icon, useDisclosure } from '@chakra-ui/react';
import { InvExpanderProps } from 'common/components/InvExpander/types';
import { InvText } from 'common/components/InvText';
import { t } from 'i18next';
import { BiCollapseVertical, BiExpandVertical } from 'react-icons/bi';

export const InvExpander = ({
  children,
  label = t('common.advancedOptions'),
  defaultIsOpen = false,
}: InvExpanderProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen });
  return (
    <Flex flexDir="column" w="full">
      <Flex flexDir="row" alignItems="center" gap={3}>
        <Divider w="unset" flexGrow={1} />
        <Flex
          as="button"
          onClick={onToggle}
          flexDir="row"
          alignItems="center"
          gap={2}
        >
          <Icon
            as={isOpen ? BiCollapseVertical : BiExpandVertical}
            color="base.400"
          />
          <InvText variant="subtext" flexShrink={0}>
            {label}
          </InvText>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex pt={4}>{children}</Flex>
      </Collapse>
    </Flex>
  );
};
