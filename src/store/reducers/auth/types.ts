import { ILoginResponse } from 'models/IAuth';

export interface AuthState {
  isAuth: boolean;
  isAuthLoading: boolean;
  authError: string;
  authToken: ILoginResponse;
  authSecretKey: string;
}

export enum AuthActionEnum {
  SET_AUTH = 'SET_AUTH',
  SET_AUTH_IS_LOADING = 'SET_AUTH_IS_LOADING',
  SET_AUTH_ERROR = 'SET_AUTH_ERROR',
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
  SET_AUTH_SECRET_KEY = 'SET_AUTH_SECRET_KEY',
}

export interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH;
  payload: boolean;
}

export interface SetAuthIsLoadingAction {
  type: AuthActionEnum.SET_AUTH_IS_LOADING;
  payload: boolean;
}

export interface SetAuthErrorAction {
  type: AuthActionEnum.SET_AUTH_ERROR;
  payload: string;
}

export interface SetAuthTokenAction {
  type: AuthActionEnum.SET_AUTH_TOKEN;
  payload: ILoginResponse;
}

export interface SetAuthSecretKeyAction {
  type: AuthActionEnum.SET_AUTH_SECRET_KEY;
  payload: string;
}

export type AuthAction =
  | SetAuthAction
  | SetAuthIsLoadingAction
  | SetAuthErrorAction
  | SetAuthTokenAction
  | SetAuthSecretKeyAction;
