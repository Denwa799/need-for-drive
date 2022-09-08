export interface IRate {
  updatedAt: string;
  createdAt: string;
  price: number;
  rateTypeId?: {
    unit: string;
    name: string;
    id: number;
  };
  id: number;
}

export interface IRateCreate {
  rateTypeId: number;
  price: number;
}
