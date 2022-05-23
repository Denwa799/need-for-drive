export interface IPoint {
  address: string;
  name: string;
  cityId?: {
    name: string;
    id: string;
  };
  id: string;
}

export interface IPointCreate {
  name: string;
  cityId: string;
  address: string;
}
