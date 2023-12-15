import { PropsWithChildren } from 'react';

export type InvCollapseProps = PropsWithChildren<{
  label: string;
  badges?: (string | number)[];
  defaultIsOpen?: boolean;
}>;
