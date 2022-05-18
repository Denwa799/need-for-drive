import { ICity } from 'models/ICity';

export interface CityState {
  city: ICity[];
  cityIsLoading: boolean;
  cityError: string;
  cityId: ICity;
  cityIdIsLoading: boolean;
  cityIdError: string;
  cityIsCreate: boolean;
  cityCreateIsLoading: boolean;
  cityCreateError: string;
  cityIsDelete: boolean;
  cityDeleteIsLoading: boolean;
  cityDeleteError: string;
}

export enum CityActionEnum {
  GET_CITY = 'GET_CITY',
  SET_CITY_ERROR = 'SET_CITY_ERROR',
  SET_CITY_IS_LOADING = 'SET_CITY_IS_LOADING',
  GET_CITY_ID = 'GET_CITY_ID',
  SET_CITY_ID_IS_LOADING = 'SET_CITY_ID_IS_LOADING',
  SET_CITY_ID_ERROR = 'SET_CITY_ID_ERROR',
  SET_CITY_IS_CREATE = 'SET_CITY_IS_CREATE',
  SET_CITY_CREATE_IS_LOADING = 'SET_CITY_CREATE_IS_LOADING',
  SET_CITY_CREATE_ERROR = 'SET_CITY_CREATE_ERROR',
  SET_CITY_IS_DELETE = 'SET_CITY_IS_DELETE',
  SET_CITY_DELETE_IS_LOADING = 'SET_CITY_DELETE_IS_LOADING',
  SET_CITY_DELETE_ERROR = 'SET_CITY_DELETE_ERROR',
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

export interface GetCityId {
  type: CityActionEnum.GET_CITY_ID;
  payload: ICity;
}

export interface SetCityIdIsLoadingAction {
  type: CityActionEnum.SET_CITY_ID_IS_LOADING;
  payload: boolean;
}

export interface SetCityIdErrorAction {
  type: CityActionEnum.SET_CITY_ID_ERROR;
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
  | GetCity
  | SetCityErrorAction
  | SetCityIsLoadingAction
  | GetCityId
  | SetCityIdIsLoadingAction
  | SetCityIdErrorAction
  | SetCityIsCreateAction
  | SetCityCreateIsLoadingAction
  | SetCityCreateErrorAction
  | SetCityIsDeleteAction
  | SetCityDeleteIsLoadingAction
  | SetCityDeleteErrorAction;
