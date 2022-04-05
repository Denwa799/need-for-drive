export interface IFormModel {
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

export interface ICarModel {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  categoryId: {
    name: string;
  };
}

export type CarClickHandlerType = (id: string, name: string, min: number, max: number) => void;

export type PageChangeHandlerType = (pageNumber: number, pageSize: number) => void;
