export interface IAdminPagination {
  total: number;
  onChange: (pageNumber: number, pageSize: number) => void;
  pageSizeOptions: string[];
  page: number;
  sizeChangerInvisibleWidth?: number;
}
