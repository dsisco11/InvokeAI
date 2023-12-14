import { PropsWithChildren } from 'react';

export type CollapseProps = PropsWithChildren<{
  label: string;
  badges?: string[];
  defaultOpen?: boolean;
}>;
