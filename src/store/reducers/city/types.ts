import { ICity } from 'models/ICity';

export interface CityState {
  cities: ICity[];
  citiesIsLoading: boolean;
  citiesError: string;
  city: ICity;
  cityIsLoading: boolean;
  cityError: string;
  cityIsCreate: boolean;
  cityCreateIsLoading: boolean;
  cityCreateError: string;
  cityIsDelete: boolean;
  cityDeleteIsLoading: boolean;
  cityDeleteError: string;
}

export enum CityActionEnum {
  GET_CITIES = 'GET_CITIES',
  SET_CITIES_IS_LOADING = 'SET_CITIES_IS_LOADING',
  SET_CITIES_ERROR = 'SET_CITIES_ERROR',
  GET_CITY = 'GET_CITY',
  SET_CITY_IS_LOADING = 'SET_CITY_IS_LOADING',
  SET_CITY_ERROR = 'SET_CITY_ERROR',
  SET_CITY_IS_CREATE = 'SET_CITY_IS_CREATE',
  SET_CITY_CREATE_IS_LOADING = 'SET_CITY_CREATE_IS_LOADING',
  SET_CITY_CREATE_ERROR = 'SET_CITY_CREATE_ERROR',
  SET_CITY_IS_DELETE = 'SET_CITY_IS_DELETE',
  SET_CITY_DELETE_IS_LOADING = 'SET_CITY_DELETE_IS_LOADING',
  SET_CITY_DELETE_ERROR = 'SET_CITY_DELETE_ERROR',
}

export interface GetCities {
  type: CityActionEnum.GET_CITIES;
  payload: ICity[];
}

export interface SetCitiesIsLoadingAction {
  type: CityActionEnum.SET_CITIES_IS_LOADING;
  payload: boolean;
}

export interface SetCitiesErrorAction {
  type: CityActionEnum.SET_CITIES_ERROR;
  payload: string;
}

export interface GetCity {
  type: CityActionEnum.GET_CITY;
  payload: ICity;
}

export interface SetCityIsLoadingAction {
  type: CityActionEnum.SET_CITY_IS_LOADING;
  payload: boolean;
}

export interface SetCityErrorAction {
  type: CityActionEnum.SET_CITY_ERROR;
  payload: string;
}

export interface SetCityIsCreateAction {
  type: CityActionEnum.SET_CITY_IS_CREATE;
  payload: boolean;
}

export interface SetCityCreateIsLoadingAction {
  type: CityActionEnum.SET_CITY_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetCityCreateErrorAction {
  type: CityActionEnum.SET_CITY_CREATE_ERROR;
  payload: string;
}

export interface SetCityIsDeleteAction {
  type: CityActionEnum.SET_CITY_IS_DELETE;
  payload: boolean;
}

export interface SetCityDeleteIsLoadingAction {
  type: CityActionEnum.SET_CITY_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetCityDeleteErrorAction {
  type: CityActionEnum.SET_CITY_DELETE_ERROR;
  payload: string;
}

export type CityAction =
  | GetCities
  | SetCitiesIsLoadingAction
  | SetCitiesErrorAction
  | GetCity
  | SetCityIsLoadingAction
  | SetCityErrorAction
  | SetCityIsCreateAction
  | SetCityCreateIsLoadingAction
  | SetCityCreateErrorAction
  | SetCityIsDeleteAction
  | SetCityDeleteIsLoadingAction
  | SetCityDeleteErrorAction;
