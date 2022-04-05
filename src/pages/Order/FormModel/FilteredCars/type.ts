import { CarClickHandlerType, ICarModel } from '../type';

export interface IFilteredCars {
  activeCarId: string;
  paginationCars: ICarModel[];
  carClickHandler: CarClickHandlerType;
}
