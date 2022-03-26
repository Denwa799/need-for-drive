export interface CityLocationState {
  city: string;
}

export enum CityLocationActionEnum {
  GET_CITY = 'GET_CITY',
  SET_CITY = 'SET_CITY',
}

export interface GetCityLocation {
  type: CityLocationActionEnum.GET_CITY;
  payload: string;
}

export interface SetCityLocation {
  type: CityLocationActionEnum.SET_CITY;
  payload: string;
}

export type CityLocationAction = GetCityLocation | SetCityLocation;
