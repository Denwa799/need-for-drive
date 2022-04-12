import { ICar } from 'models/ICar';

export interface IFormModel {
  activeCarId: string;
  activeCar: string;
  setActiveCar: (value: string) => void;
  setActiveCarId: (value: string) => void;
  setSelectedCar: (value: ICar) => void;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
  pageSizeOptions: string[];
}

export type CarClickHandlerType = (
  car: ICar,
  id: string,
  name: string,
  min: number,
  max: number
) => void;

export type PageChangeHandlerType = (pageNumber: number, pageSize: number) => void;
