import { PageChangeHandlerType } from '../../pages/Order/FormModel/type';

export interface IAppPagination {
  total: number;
  onChange: PageChangeHandlerType;
  pageSizeOptions: string[];
  page: number;
}
