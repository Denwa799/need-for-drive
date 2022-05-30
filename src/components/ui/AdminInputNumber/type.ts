export interface IAdminInputNumber {
  min?: number;
  max?: number;
  className?: string;
  bordered?: boolean;
  value: number;
  onChange: (value: number) => void;
  danger?: boolean;
}
