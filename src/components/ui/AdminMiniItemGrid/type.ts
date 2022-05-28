export interface IAdminMiniItemGrid {
  className?: string;
  containerClassName?: string;
  array: string[];
  deleteHandler: (index: number) => void;
}
