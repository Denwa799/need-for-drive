import { ICar } from 'models/ICar';
import { CarClickHandlerType } from '../type';

export interface IFilteredCars {
  activeCarId: string;
  paginationCars: ICar[];
  carClickHandler: CarClickHandlerType;
}
