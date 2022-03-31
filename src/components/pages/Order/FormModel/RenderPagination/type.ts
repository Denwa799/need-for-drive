import { pageChangeHandlerType } from '../type';

export interface IRenderPagination {
  total: number;
  onChange: pageChangeHandlerType;
  pageSizeOptions: string[];
  page: number;
}
