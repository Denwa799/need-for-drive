export interface IPoint {
  address: string;
  name: string;
  cityId?: {
    name: string;
    id: number;
  };
  id: number;
}

export interface IPointCreate {
  name: string;
  cityId: number;
  address: string;
}
