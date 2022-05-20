import { IRate } from 'models/IRate';

export interface RatesState {
  rates: IRate[];
  ratesIsLoading: boolean;
  ratesError: string;
  rateId: IRate;
  rateIdIsLoading: boolean;
  rateIdError: string;
  rateIsCreate: boolean;
  rateCreateIsLoading: boolean;
  rateCreateError: string;
  rateIsDelete: boolean;
  rateDeleteIsLoading: boolean;
  rateDeleteError: string;
}

export enum RatesActionEnum {
  GET_RATES = 'GET_RATES',
  SET_RATES_ERROR = 'SET_RATES_ERROR',
  SET_RATES_IS_LOADING = 'SET_RATES_IS_LOADING',
  GET_RATE_ID = 'GET_RATE_ID',
  SET_RATE_ID_IS_LOADING = 'SET_RATE_ID_IS_LOADING',
  SET_RATE_ID_ERROR = 'SET_RATE_ID_ERROR',
  SET_RATE_IS_CREATE = 'SET_RATE_IS_CREATE',
  SET_RATE_CREATE_IS_LOADING = 'SET_RATE_CREATE_IS_LOADING',
  SET_RATE_CREATE_ERROR = 'SET_RATE_CREATE_ERROR',
  SET_RATE_IS_DELETE = 'SET_RATE_IS_DELETE',
  SET_RATE_DELETE_IS_LOADING = 'SET_RATE_DELETE_IS_LOADING',
  SET_RATE_DELETE_ERROR = 'SET_RATE_DELETE_ERROR',
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

export interface GetRateId {
  type: RatesActionEnum.GET_RATE_ID;
  payload: IRate;
}

export interface SetRateIdIsLoadingAction {
  type: RatesActionEnum.SET_RATE_ID_IS_LOADING;
  payload: boolean;
}

export interface SetRateIdErrorAction {
  type: RatesActionEnum.SET_RATE_ID_ERROR;
  payload: string;
}

export interface SetRateIsCreateAction {
  type: RatesActionEnum.SET_RATE_IS_CREATE;
  payload: boolean;
}

export interface SetRateCreateIsLoadingAction {
  type: RatesActionEnum.SET_RATE_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetRateCreateErrorAction {
  type: RatesActionEnum.SET_RATE_CREATE_ERROR;
  payload: string;
}

export interface SetRateIsDeleteAction {
  type: RatesActionEnum.SET_RATE_IS_DELETE;
  payload: boolean;
}

export interface SetRateDeleteIsLoadingAction {
  type: RatesActionEnum.SET_RATE_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetRateDeleteErrorAction {
  type: RatesActionEnum.SET_RATE_DELETE_ERROR;
  payload: string;
}

export type RatesAction =
  | GetRates
  | SetRatesErrorAction
  | SetRatesIsLoadingAction
  | GetRateId
  | SetRateIdIsLoadingAction
  | SetRateIdErrorAction
  | SetRateIsCreateAction
  | SetRateCreateIsLoadingAction
  | SetRateCreateErrorAction
  | SetRateIsDeleteAction
  | SetRateDeleteIsLoadingAction
  | SetRateDeleteErrorAction;
