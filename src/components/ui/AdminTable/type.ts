export interface IAdminTable {
  head: string[];
  body: Object[];
  isBtns?: boolean;
  onDeleteClick?: (id: string) => void;
  onChangeClick?: (id: string) => void;
  deleteDisabled?: boolean;
}
