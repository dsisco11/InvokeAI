import { PropsWithChildren } from 'react';

export type InvExpanderProps = PropsWithChildren<{
  label?: string;
  defaultIsOpen?: boolean;
}>;
