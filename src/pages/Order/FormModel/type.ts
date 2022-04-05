import { ICar } from 'models/ICar';

export interface IFormModel {
  cars: ICar[];
  categories: {
    id: string;
    name: string;
  }[];
  activeCarId: string;
  activeCar: string;
  setActiveCar: (value: string) => void;
  setActiveCarId: (value: string) => void;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  pageSizeOptions: string[];
}

export type CarClickHandlerType = (id: string, name: string, min: number, max: number) => void;

export type PageChangeHandlerType = (pageNumber: number, pageSize: number) => void;
