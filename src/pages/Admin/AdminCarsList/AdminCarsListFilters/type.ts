import { ICar } from 'models/ICar';

export interface IAdminCarsListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredCars: (value: ICar[]) => void;
}

export type FilterOptionType = (
  inputValue: string,
  option: { value: string } | undefined
) => boolean;
