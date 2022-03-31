import { carClickHandlerType, ICarModel } from '../type';

export interface IRenderCars {
  paginationCars: ICarModel[];
  filteredCars: ICarModel[];
  carClickHandler: carClickHandlerType;
}
