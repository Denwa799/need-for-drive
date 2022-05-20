export interface IRate {
  updatedAt: number;
  createdAt: number;
  price: number;
  rateTypeId?: {
    unit: string;
    name: string;
    id: string;
  };
  id: string;
}

export interface IRateCreate {
  rateTypeId: string;
  price: number;
}
