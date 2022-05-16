export interface ICar {
  updatedAt: number;
  createdAt: number;
  id: string;
  description: string;
  priceMin: number;
  priceMax: number;
  name: string;
  number: string;
  categoryId: {
    name: string;
    description: string;
    id: string;
  };
  thumbnail: {
    size: number;
    path: string;
    originalname: string;
    mimetype: string;
  };
  tank: number;
  colors: string[];
}

export interface ICarCreate {
  name: string;
  thumbnail: object;
  description: string;
  categoryId: string;
  colors: string[];
  tank: number;
  number: string;
  priceMin: number;
  priceMax: number;
}
