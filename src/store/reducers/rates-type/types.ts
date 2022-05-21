import { IRateType } from 'models/IRateType';

export interface RatesTypeState {
  ratesType: IRateType[];
  ratesTypeIsLoading: boolean;
  ratesTypeError: string;
}

export enum RatesTypeActionEnum {
  GET_RATES_TYPE = 'GET_RATES_TYPE',
  SET_RATES_TYPE_ERROR = 'SET_RATES_TYPE_ERROR',
  SET_RATES_TYPE_IS_LOADING = 'SET_RATES_TYPE_IS_LOADING',
}

export interface GetRatesType {
  type: RatesTypeActionEnum.GET_RATES_TYPE;
  payload: IRateType[];
}

export interface SetRatesTypeErrorAction {
  type: RatesTypeActionEnum.SET_RATES_TYPE_ERROR;
  payload: string;
}

export interface SetRatesTypeIsLoadingAction {
  type: RatesTypeActionEnum.SET_RATES_TYPE_IS_LOADING;
  payload: boolean;
}

export type RatesTypeAction = GetRatesType | SetRatesTypeErrorAction | SetRatesTypeIsLoadingAction;
