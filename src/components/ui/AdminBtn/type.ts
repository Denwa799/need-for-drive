import { ReactNode } from 'react';

export interface IAdminBtn {
  onClick: () => void;
  className?: string;
  containerClassName?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'red' | 'pink' | 'blue' | 'gray' | 'check' | 'more' | 'close' | 'add';
}
