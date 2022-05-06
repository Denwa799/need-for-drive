export interface IAdminOrderListFilteres {
  limit: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export type FilterOptionType = (
  inputValue: string,
  option: { value: string } | undefined
) => boolean;
