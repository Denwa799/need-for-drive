import { ILoginResponse } from 'models/IAuth';
import { AuthAction, AuthActionEnum, AuthState } from './types';

const initialState: AuthState = {
  isAuth: false,
  authError: '',
  isAuthLoading: false,
  authToken: {} as ILoginResponse,
  authSecretKey: '',
};

export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isAuthLoading: false };

    case AuthActionEnum.SET_AUTH_IS_LOADING:
      return { ...state, isAuthLoading: action.payload, authError: '' };

    case AuthActionEnum.SET_AUTH_ERROR:
      return { ...state, authError: action.payload, isAuthLoading: false };

    case AuthActionEnum.SET_AUTH_TOKEN:
      return { ...state, authToken: action.payload };

    case AuthActionEnum.SET_AUTH_SECRET_KEY:
      return { ...state, authSecretKey: action.payload };

    default:
      return state;
  }
}
