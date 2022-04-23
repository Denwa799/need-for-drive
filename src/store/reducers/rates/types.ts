import { IRate } from 'models/IRate';

export interface RatesState {
  rates: IRate[];
  ratesIsLoading: boolean;
  ratesError: string;
}

export enum RatesActionEnum {
  GET_RATES = 'GET_RATES',
  SET_RATES_ERROR = 'SET_RATES_ERROR',
  SET_RATES_IS_LOADING = 'SET_RATES_IS_LOADING',
}

export interface GetRates {
  type: RatesActionEnum.GET_RATES;
  payload: IRate[];
}

export interface SetRatesErrorAction {
  type: RatesActionEnum.SET_RATES_ERROR;
  payload: string;
}

export interface SetRatesIsLoadingAction {
  type: RatesActionEnum.SET_RATES_IS_LOADING;
  payload: boolean;
}

export type RatesAction = GetRates | SetRatesErrorAction | SetRatesIsLoadingAction;
