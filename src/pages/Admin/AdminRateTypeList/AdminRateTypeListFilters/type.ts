import { IRateType } from 'models/IRateType';

export interface IAdminRateTypeListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredRatesType: (value: IRateType[]) => void;
}
