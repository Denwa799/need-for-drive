import { ICar } from 'models/ICar';
import { CarClickHandlerType } from '../type';

export interface IFilteredCars {
  activeCarId: number;
  paginationCars: ICar[];
  carClickHandler: CarClickHandlerType;
}
