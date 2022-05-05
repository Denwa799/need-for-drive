export interface IAppPagination {
  total: number;
  onChange: (pageNumber: number, pageSize: number) => void;
  pageSizeOptions: string[];
  page: number;
  type?: string;
}
