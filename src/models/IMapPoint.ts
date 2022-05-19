export interface IMapPoint {
  address: string;
  name: string;
  cityId?: {
    name: string;
    id: string;
  };
  id: string;
}

export interface IMapPointCreate {
  name: string;
  cityId: string;
  address: string;
}
