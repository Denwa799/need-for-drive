import { ICar } from 'models/ICar';

export interface IAdminCarsListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredCars: (value: ICar[]) => void;
}
