import { ICar } from 'models/ICar';
import { Moment } from 'moment';

export interface IFormTotal {
  selectedCar: ICar | undefined;
  startDate: Moment;
  endDate: Moment | undefined;
  isFullTank: boolean;
}
