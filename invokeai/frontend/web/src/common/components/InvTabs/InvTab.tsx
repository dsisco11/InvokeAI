import { Spacer } from '@chakra-ui/layout';
import { Tab as ChakraTab } from '@chakra-ui/react';
import { InvBadge } from 'common/components/InvBadge';
import { InvTabProps } from 'common/components/InvTabs/types';

export const InvTab = (props: InvTabProps) => {
  const { children, badges, ...rest } = props;
  return (
    <ChakraTab {...rest}>
      {children}
      <Spacer />
      {badges?.map((b, i) => (
        <InvBadge key={`${b}.${i}`} variant="tab">
          {b}
        </InvBadge>
      ))}
    </ChakraTab>
  );
};
