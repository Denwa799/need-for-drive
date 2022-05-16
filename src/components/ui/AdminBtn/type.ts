import { ReactNode } from 'react';

export interface IAdminBtn {
  onClick: () => void;
  type?: string;
  className?: string;
  containerClassName?: string;
  icon?: ReactNode;
  isLoading?: boolean;
}
