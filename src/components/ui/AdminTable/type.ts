export interface IAdminTable {
  head: string[];
  body: Object[];
  isBtns?: boolean;
  onDeleteClick?: (id: number) => void;
  onChangeClick?: (id: number) => void;
  deleteDisabled?: boolean;
}
