import { IRateType } from 'models/IRateType';

export interface RatesTypeState {
  ratesType: IRateType[];
  ratesTypeIsLoading: boolean;
  ratesTypeError: string;
  rateTypeId: IRateType;
  rateTypeIdIsLoading: boolean;
  rateTypeIdError: string;
  rateTypeIsCreate: boolean;
  rateTypeCreateIsLoading: boolean;
  rateTypeCreateError: string;
  rateTypeIsDelete: boolean;
  rateTypeDeleteIsLoading: boolean;
  rateTypeDeleteError: string;
}

export enum RatesTypeActionEnum {
  GET_RATES_TYPE = 'GET_RATES_TYPE',
  SET_RATES_TYPE_ERROR = 'SET_RATES_TYPE_ERROR',
  SET_RATES_TYPE_IS_LOADING = 'SET_RATES_TYPE_IS_LOADING',
  GET_RATE_TYPE_ID = 'GET_RATE_TYPE_ID',
  SET_RATE_TYPE_ID_IS_LOADING = 'SET_RATE_TYPE_ID_IS_LOADING',
  SET_RATE_TYPE_ID_ERROR = 'SET_RATE_TYPE_ID_ERROR',
  SET_RATE_TYPE_IS_CREATE = 'SET_RATE_TYPE_IS_CREATE',
  SET_RATE_TYPE_CREATE_IS_LOADING = 'SET_RATE_TYPE_CREATE_IS_LOADING',
  SET_RATE_TYPE_CREATE_ERROR = 'SET_RATE_TYPE_CREATE_ERROR',
  SET_RATE_TYPE_IS_DELETE = 'SET_RATE_TYPE_IS_DELETE',
  SET_RATE_TYPE_DELETE_IS_LOADING = 'SET_RATE_TYPE_DELETE_IS_LOADING',
  SET_RATE_TYPE_DELETE_ERROR = 'SET_RATE_TYPE_DELETE_ERROR',
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

export interface GetRateTypeId {
  type: RatesTypeActionEnum.GET_RATE_TYPE_ID;
  payload: IRateType;
}

export interface SetRateTypeIdIsLoadingAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_ID_IS_LOADING;
  payload: boolean;
}

export interface SetRateTypeIdErrorAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_ID_ERROR;
  payload: string;
}

export interface SetRateTypeIsCreateAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_IS_CREATE;
  payload: boolean;
}

export interface SetRateTypeCreateIsLoadingAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetRateTypeCreateErrorAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_CREATE_ERROR;
  payload: string;
}

export interface SetRateTypeIsDeleteAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_IS_DELETE;
  payload: boolean;
}

export interface SetRateTypeDeleteIsLoadingAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetRateTypeDeleteErrorAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_DELETE_ERROR;
  payload: string;
}

export type RatesTypeAction =
  | GetRatesType
  | SetRatesTypeErrorAction
  | SetRatesTypeIsLoadingAction
  | GetRateTypeId
  | SetRateTypeIdIsLoadingAction
  | SetRateTypeIdErrorAction
  | SetRateTypeIsCreateAction
  | SetRateTypeCreateIsLoadingAction
  | SetRateTypeCreateErrorAction
  | SetRateTypeIsDeleteAction
  | SetRateTypeDeleteIsLoadingAction
  | SetRateTypeDeleteErrorAction;
