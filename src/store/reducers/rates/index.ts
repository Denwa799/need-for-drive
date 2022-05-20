import { IRate } from 'models/IRate';
import { RatesAction, RatesActionEnum, RatesState } from './types';

const initialState: RatesState = {
  rates: [],
  ratesError: '',
  ratesIsLoading: false,
  rateId: {} as IRate,
  rateIdIsLoading: false,
  rateIdError: '',
  rateIsCreate: false,
  rateCreateIsLoading: false,
  rateCreateError: '',
  rateIsDelete: false,
  rateDeleteIsLoading: false,
  rateDeleteError: '',
};

export default function RatesReducer(state = initialState, action: RatesAction): RatesState {
  switch (action.type) {
    case RatesActionEnum.GET_RATES:
      return { ...state, rates: action.payload, ratesIsLoading: false };

    case RatesActionEnum.SET_RATES_IS_LOADING:
      return { ...state, ratesIsLoading: action.payload };

    case RatesActionEnum.SET_RATES_ERROR:
      return { ...state, ratesError: action.payload, ratesIsLoading: false };

    case RatesActionEnum.GET_RATE_ID:
      return { ...state, rateId: action.payload, rateIdIsLoading: false };

    case RatesActionEnum.SET_RATE_ID_IS_LOADING:
      return { ...state, rateIdIsLoading: action.payload };

    case RatesActionEnum.SET_RATE_ID_ERROR:
      return { ...state, rateIdError: action.payload, rateIdIsLoading: false };

    case RatesActionEnum.SET_RATE_IS_CREATE:
      return { ...state, rateIsCreate: action.payload };

    case RatesActionEnum.SET_RATE_CREATE_IS_LOADING:
      return { ...state, rateCreateIsLoading: action.payload };

    case RatesActionEnum.SET_RATE_CREATE_ERROR:
      return { ...state, rateCreateError: action.payload, rateCreateIsLoading: false };

    case RatesActionEnum.SET_RATE_IS_DELETE:
      return { ...state, rateIsDelete: action.payload };

    case RatesActionEnum.SET_RATE_DELETE_IS_LOADING:
      return { ...state, rateDeleteIsLoading: action.payload };

    case RatesActionEnum.SET_RATE_DELETE_ERROR:
      return { ...state, rateDeleteError: action.payload, rateDeleteIsLoading: false };

    default:
      return state;
  }
}
