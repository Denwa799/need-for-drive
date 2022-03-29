export interface ICarModel {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  categoryId: {
    name: string;
  };
}
