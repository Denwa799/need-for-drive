import { IRateType } from 'models/IRateType';
import { RatesTypeAction, RatesTypeActionEnum, RatesTypeState } from './types';

const initialState: RatesTypeState = {
  ratesType: [],
  ratesTypeError: '',
  ratesTypeIsLoading: false,
  rateTypeId: {} as IRateType,
  rateTypeIdIsLoading: false,
  rateTypeIdError: '',
  rateTypeIsCreate: false,
  rateTypeCreateIsLoading: false,
  rateTypeCreateError: '',
  rateTypeIsDelete: false,
  rateTypeDeleteIsLoading: false,
  rateTypeDeleteError: '',
};

export default function RatesTypeReducer(
  state = initialState,
  action: RatesTypeAction
): RatesTypeState {
  switch (action.type) {
    case RatesTypeActionEnum.GET_RATES_TYPE:
      return { ...state, ratesType: action.payload, ratesTypeIsLoading: false };

    case RatesTypeActionEnum.SET_RATES_TYPE_IS_LOADING:
      return { ...state, ratesTypeIsLoading: action.payload };

    case RatesTypeActionEnum.SET_RATES_TYPE_ERROR:
      return { ...state, ratesTypeError: action.payload, ratesTypeIsLoading: false };

    case RatesTypeActionEnum.GET_RATE_TYPE_ID:
      return { ...state, rateTypeId: action.payload, rateTypeIdIsLoading: false };

    case RatesTypeActionEnum.SET_RATE_TYPE_ID_IS_LOADING:
      return { ...state, rateTypeIdIsLoading: action.payload };

    case RatesTypeActionEnum.SET_RATE_TYPE_ID_ERROR:
      return { ...state, rateTypeIdError: action.payload, rateTypeIdIsLoading: false };

    case RatesTypeActionEnum.SET_RATE_TYPE_IS_CREATE:
      return { ...state, rateTypeIsCreate: action.payload };

    case RatesTypeActionEnum.SET_RATE_TYPE_CREATE_IS_LOADING:
      return { ...state, rateTypeCreateIsLoading: action.payload };

    case RatesTypeActionEnum.SET_RATE_TYPE_CREATE_ERROR:
      return { ...state, rateTypeCreateError: action.payload, rateTypeCreateIsLoading: false };

    case RatesTypeActionEnum.SET_RATE_TYPE_IS_DELETE:
      return { ...state, rateTypeIsDelete: action.payload };

    case RatesTypeActionEnum.SET_RATE_TYPE_DELETE_IS_LOADING:
      return { ...state, rateTypeDeleteIsLoading: action.payload };

    case RatesTypeActionEnum.SET_RATE_TYPE_DELETE_ERROR:
      return { ...state, rateTypeDeleteError: action.payload, rateTypeDeleteIsLoading: false };

    default:
      return state;
  }
}
