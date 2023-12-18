import { Flex, Text } from '@chakra-ui/react';
import { InvSelectFallbackProps } from 'common/components/InvSelect/types';

export const InvSelectFallback = (props: InvSelectFallbackProps) => (
  <Flex h={8} alignItems="center" justifyContent="center">
    <Text fontSize="sm" color="base.500">
      {props.label}
    </Text>
  </Flex>
);
