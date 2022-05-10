import { IMapPoint } from 'models/IMapPoint';

export interface IAdminPointListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredPoints: (value: IMapPoint[]) => void;
}
