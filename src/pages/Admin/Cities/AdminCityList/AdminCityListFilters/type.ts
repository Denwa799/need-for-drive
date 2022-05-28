import { ICity } from 'models/ICity';

export interface IAdminCityListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredCity: (value: ICity[]) => void;
}

export type FilterOptionType = (
  inputValue: string,
  option: { value: string } | undefined
) => boolean;
