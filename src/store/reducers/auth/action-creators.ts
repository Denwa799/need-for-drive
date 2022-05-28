import { AppDispatch } from 'store/index';
import { AuthService, RefreshAuthService } from 'api';
import { ILoginResponse } from 'models/IAuth';
import {
  AuthActionEnum,
  SetAuthAction,
  SetAuthErrorAction,
  SetAuthIsLoadingAction,
  SetAuthTokenAction,
  SetAuthSecretKeyAction,
} from './types';

export const AuthActionCreators = {
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setAuthIsLoading: (payload: boolean): SetAuthIsLoadingAction => ({
    type: AuthActionEnum.SET_AUTH_IS_LOADING,
    payload,
  }),
  setAuthError: (payload: string): SetAuthErrorAction => ({
    type: AuthActionEnum.SET_AUTH_ERROR,
    payload,
  }),
  setAuthToken: (payload: ILoginResponse): SetAuthTokenAction => ({
    type: AuthActionEnum.SET_AUTH_TOKEN,
    payload,
  }),
  setAuthSecretKey: (payload: string): SetAuthSecretKeyAction => ({
    type: AuthActionEnum.SET_AUTH_SECRET_KEY,
    payload,
  }),
  login: (username: string, password: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setAuthError(''));
      dispatch(AuthActionCreators.setAuthIsLoading(true));
      const response = await AuthService(
        process.env.REACT_APP_AUTH_LOGIN_API,
        token,
        username,
        password
      );
      dispatch(AuthActionCreators.setAuthToken(response.data));
      dispatch(AuthActionCreators.setAuthSecretKey(token));
      dispatch(AuthActionCreators.setIsAuth(true));
    } catch (e) {
      dispatch(AuthActionCreators.setAuthError('Неправильный логин или пароль'));
    }
  },
  checkAuth: (token: string, refreshToken: string) => async (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setAuthError(''));
    dispatch(AuthActionCreators.setAuthIsLoading(true));
    try {
      const response = await RefreshAuthService(
        process.env.REACT_APP_AUTH_REFRESH_API,
        token,
        refreshToken
      );
      dispatch(AuthActionCreators.setAuthToken(response.data));
      dispatch(AuthActionCreators.setAuthSecretKey(token));
      dispatch(AuthActionCreators.setIsAuth(true));
    } catch (e) {
      dispatch(AuthActionCreators.setAuthError('Произошла ошибка при авторизации'));
    } finally {
      dispatch(AuthActionCreators.setAuthIsLoading(false));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setAuthToken({} as ILoginResponse));
      dispatch(AuthActionCreators.setAuthSecretKey(''));
      dispatch(AuthActionCreators.setIsAuth(false));
    } catch (e) {
      dispatch(AuthActionCreators.setAuthError('Произошла ошибка во время выхода'));
    }
  },
};
