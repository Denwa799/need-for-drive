import { IRate } from 'models/IRate';

export interface IAdminRateListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredRates: (value: IRate[]) => void;
}
