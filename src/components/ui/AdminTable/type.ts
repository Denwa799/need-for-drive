export interface IAdminTable {
  head: string[];
  body: Object[];
  isBtns?: boolean;
  onDeleteClick?: () => void;
  onChangeClick?: () => void;
}
