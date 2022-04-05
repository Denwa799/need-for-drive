import { ICar } from 'models/ICar';

export interface CarsState {
  cars: ICar[];
  carsIsLoading: boolean;
  carsError: string;
}

export enum CarsActionEnum {
  GET_CARS = 'GET_CARS',
  SET_CARS_ERROR = 'SET_CARS_ERROR',
  SET_CARS_IS_LOADING = 'SET_CARS_IS_LOADING',
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

export type CarsAction = GetCars | SetCarsIsLoadingAction | SetCarsErrorAction;
