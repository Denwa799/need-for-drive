export interface IAdminAutocomplete {
  options: { value: string }[];
  filterOption?: (inputValue: string, option: { value: string } | undefined) => boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  isLoading?: boolean;
  onSelect?: (value: string) => void;
  type?: string;
  danger?: boolean;
}

export type FilterOptionType = (
  inputValue: string,
  option: { value: string } | undefined
) => boolean;
