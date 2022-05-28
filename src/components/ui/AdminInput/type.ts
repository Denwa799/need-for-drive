import { ChangeEvent } from 'react';

export interface IAdminInput {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  className?: string;
  danger?: boolean;
  maxLength?: number;
}
