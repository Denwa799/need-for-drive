import { IPoint } from 'models/IPoint';

export interface IAdminPointListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredPoints: (value: IPoint[]) => void;
}
