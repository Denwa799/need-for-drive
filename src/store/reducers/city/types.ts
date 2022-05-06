import { ICity } from 'models/ICity';

export interface CityState {
  city: ICity[];
  cityIsLoading: boolean;
  cityError: string;
}

export enum CityActionEnum {
  GET_CITY = 'GET_CITY',
  SET_CITY_ERROR = 'SET_CITY_ERROR',
  SET_CITY_IS_LOADING = 'SET_CITY_IS_LOADING',
}

export interface GetCity {
  type: CityActionEnum.GET_CITY;
  payload: ICity[];
}

export interface SetCityErrorAction {
  type: CityActionEnum.SET_CITY_ERROR;
  payload: string;
}

export interface SetCityIsLoadingAction {
  type: CityActionEnum.SET_CITY_IS_LOADING;
  payload: boolean;
}

export type CityAction = GetCity | SetCityErrorAction | SetCityIsLoadingAction;
