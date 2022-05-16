import { ICar } from 'models/ICar';

export interface CarsState {
  cars: ICar[];
  carsIsLoading: boolean;
  carsError: string;
  carIsCreate: boolean;
  carCreateError: string;
}

export enum CarsActionEnum {
  GET_CARS = 'GET_CARS',
  SET_CARS_ERROR = 'SET_CARS_ERROR',
  SET_CARS_IS_LOADING = 'SET_CARS_IS_LOADING',
  SET_CAR_IS_CREATE = 'SET_CAR_IS_CREATE',
  SET_CAR_CREATE_ERROR = 'SET_CAR_CREATE_ERROR',
}

export interface GetCars {
  type: CarsActionEnum.GET_CARS;
  payload: ICar[];
}

export interface SetCarsErrorAction {
  type: CarsActionEnum.SET_CARS_ERROR;
  payload: string;
}

export interface SetCarsIsLoadingAction {
  type: CarsActionEnum.SET_CARS_IS_LOADING;
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

export type CarsAction =
  | GetCars
  | SetCarsIsLoadingAction
  | SetCarsErrorAction
  | SetCarIsCreateAction
  | SetCarCreateErrorAction;
