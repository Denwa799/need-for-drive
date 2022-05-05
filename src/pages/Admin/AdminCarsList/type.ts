export type PageChangeHandlerType = (pageNumber: number, pageSize: number) => void;
export type FilterOptionType = (
  inputValue: string,
  option: { value: string } | undefined
) => boolean;
