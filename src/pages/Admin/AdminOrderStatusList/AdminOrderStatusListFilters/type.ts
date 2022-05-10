import { IOrderStatus } from 'models/IOrderStatus';

export interface IAdminOrderStatusListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredOrdersStatus: (value: IOrderStatus[]) => void;
}
