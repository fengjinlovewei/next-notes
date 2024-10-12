import { ReactNode } from 'react';

declare global {
  interface PropsBase {
    children?: ReactNode;
  }
}
