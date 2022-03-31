import { carClickHandlerType, ICarModel } from '../type';

export interface IRenderCars {
  activeCarId: string;
  paginationCars: ICarModel[];
  filteredCars: ICarModel[];
  carClickHandler: carClickHandlerType;
}
