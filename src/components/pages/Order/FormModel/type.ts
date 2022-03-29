export interface IFormModel {
  setActiveCar: (value: string) => void;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
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
