import { IRateType } from 'models/IRateType';

export interface RatesTypeState {
  allRateType: IRateType[];
  allRateTypeIsLoading: boolean;
  allRateTypeError: string;
  rateType: IRateType;
  rateTypeIsLoading: boolean;
  rateTypeError: string;
  rateTypeIsCreate: boolean;
  rateTypeCreateIsLoading: boolean;
  rateTypeCreateError: string;
  rateTypeIsDelete: boolean;
  rateTypeDeleteIsLoading: boolean;
  rateTypeDeleteError: string;
}

export enum RatesTypeActionEnum {
  GET_ALL_RATE_TYPE = 'GET_ALL_RATE_TYPE',
  SET_ALL_RATE_TYPE_ERROR = 'SET_ALL_RATE_TYPE_ERROR',
  SET_ALL_RATE_TYPE_IS_LOADING = 'SET_ALL_RATE_TYPE_IS_LOADING',
  GET_RATE_TYPE = 'GET_RATE_TYPE',
  SET_RATE_TYPE_IS_LOADING = 'SET_RATE_TYPE_IS_LOADING',
  SET_RATE_TYPE_ERROR = 'SET_RATE_TYPE_ERROR',
  SET_RATE_TYPE_IS_CREATE = 'SET_RATE_TYPE_IS_CREATE',
  SET_RATE_TYPE_CREATE_IS_LOADING = 'SET_RATE_TYPE_CREATE_IS_LOADING',
  SET_RATE_TYPE_CREATE_ERROR = 'SET_RATE_TYPE_CREATE_ERROR',
  SET_RATE_TYPE_IS_DELETE = 'SET_RATE_TYPE_IS_DELETE',
  SET_RATE_TYPE_DELETE_IS_LOADING = 'SET_RATE_TYPE_DELETE_IS_LOADING',
  SET_RATE_TYPE_DELETE_ERROR = 'SET_RATE_TYPE_DELETE_ERROR',
}

export interface GetAllRateType {
  type: RatesTypeActionEnum.GET_ALL_RATE_TYPE;
  payload: IRateType[];
}

export interface SetAllRateTypeErrorAction {
  type: RatesTypeActionEnum.SET_ALL_RATE_TYPE_ERROR;
  payload: string;
}

export interface SetAllRateTypeIsLoadingAction {
  type: RatesTypeActionEnum.SET_ALL_RATE_TYPE_IS_LOADING;
  payload: boolean;
}

export interface GetRateType {
  type: RatesTypeActionEnum.GET_RATE_TYPE;
  payload: IRateType;
}

export interface SetRateTypeIsLoadingAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_IS_LOADING;
  payload: boolean;
}

export interface SetRateTypeErrorAction {
  type: RatesTypeActionEnum.SET_RATE_TYPE_ERROR;
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
  | GetAllRateType
  | SetAllRateTypeErrorAction
  | SetAllRateTypeIsLoadingAction
  | GetRateType
  | SetRateTypeIsLoadingAction
  | SetRateTypeErrorAction
  | SetRateTypeIsCreateAction
  | SetRateTypeCreateIsLoadingAction
  | SetRateTypeCreateErrorAction
  | SetRateTypeIsDeleteAction
  | SetRateTypeDeleteIsLoadingAction
  | SetRateTypeDeleteErrorAction;
