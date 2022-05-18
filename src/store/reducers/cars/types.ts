import { ICar } from 'models/ICar';

export interface CarsState {
  cars: ICar[];
  car: ICar;
  carsIsLoading: boolean;
  carIdIsLoading: boolean;
  carsError: string;
  carIdError: string;
  carIsCreate: boolean;
  carCreateError: string;
  carIsDelete: boolean;
  carDeleteIsLoading: boolean;
  carDeleteError: string;
}

export enum CarsActionEnum {
  GET_CARS = 'GET_CARS',
  GET_CAR = 'GET_CAR',
  SET_CARS_ERROR = 'SET_CARS_ERROR',
  SET_CAR_ID_ERROR = 'SET_CAR_ID_ERROR',
  SET_CARS_IS_LOADING = 'SET_CARS_IS_LOADING',
  SET_CAR_ID_IS_LOADING = 'SET_CAR_ID_IS_LOADING',
  SET_CAR_IS_CREATE = 'SET_CAR_IS_CREATE',
  SET_CAR_CREATE_ERROR = 'SET_CAR_CREATE_ERROR',
  SET_CAR_IS_DELETE = 'SET_CAR_IS_DELETE',
  SET_CAR_DELETE_IS_LOADING = 'SET_CAR_DELETE_IS_LOADING',
  SET_CAR_DELETE_ERROR = 'SET_CAR_DELETE_ERROR',
}

export interface GetCars {
  type: CarsActionEnum.GET_CARS;
  payload: ICar[];
}

export interface GetCar {
  type: CarsActionEnum.GET_CAR;
  payload: ICar;
}

export interface SetCarsErrorAction {
  type: CarsActionEnum.SET_CARS_ERROR;
  payload: string;
}

export interface SetCarIdErrorAction {
  type: CarsActionEnum.SET_CAR_ID_ERROR;
  payload: string;
}

export interface SetCarsIsLoadingAction {
  type: CarsActionEnum.SET_CARS_IS_LOADING;
  payload: boolean;
}

export interface SetCarIdIsLoadingAction {
  type: CarsActionEnum.SET_CAR_ID_IS_LOADING;
  payload: boolean;
}

export interface SetCarIsCreateAction {
  type: CarsActionEnum.SET_CAR_IS_CREATE;
  payload: boolean;
}

export interface SetCarCreateErrorAction {
  type: CarsActionEnum.SET_CAR_CREATE_ERROR;
  payload: string;
}

export interface SetCarIsDeleteAction {
  type: CarsActionEnum.SET_CAR_IS_DELETE;
  payload: boolean;
}

export interface SetCarDeleteIsLoadingAction {
  type: CarsActionEnum.SET_CAR_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetCarDeleteErrorAction {
  type: CarsActionEnum.SET_CAR_DELETE_ERROR;
  payload: string;
}

export type CarsAction =
  | GetCars
  | GetCar
  | SetCarsIsLoadingAction
  | SetCarIdIsLoadingAction
  | SetCarsErrorAction
  | SetCarIdErrorAction
  | SetCarIsCreateAction
  | SetCarCreateErrorAction
  | SetCarIsDeleteAction
  | SetCarDeleteIsLoadingAction
  | SetCarDeleteErrorAction;
