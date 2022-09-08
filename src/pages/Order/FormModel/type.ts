import { ICar } from 'models/ICar';

export interface IFormModel {
  activeCarId: number;
  activeCar: string;
  setActiveCar: (value: string) => void;
  setActiveCarId: (value: number) => void;
  setSelectedCar: (value: ICar) => void;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
  setCarColors: (value: string[]) => void;
  pageSizeOptions: string[];
  clearFormAdditionally: () => void;
  setMaxStage: (value: number) => void;
}

export type CarClickHandlerType = (
  car: ICar,
  id: number,
  name: string,
  min: number,
  max: number,
  colors: string[]
) => void;

export type PageChangeHandlerType = (pageNumber: number, pageSize: number) => void;
