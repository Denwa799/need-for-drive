import { IRateType } from 'models/IRateType';
import { RatesTypeAction, RatesTypeActionEnum, RatesTypeState } from './types';

const initialState: RatesTypeState = {
  allRateType: [],
  allRateTypeError: '',
  allRateTypeIsLoading: false,
  rateType: {} as IRateType,
  rateTypeIsLoading: false,
  rateTypeError: '',
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
    case RatesTypeActionEnum.GET_ALL_RATE_TYPE:
      return { ...state, allRateType: action.payload, allRateTypeIsLoading: false };

    case RatesTypeActionEnum.SET_ALL_RATE_TYPE_IS_LOADING:
      return { ...state, allRateTypeIsLoading: action.payload };

    case RatesTypeActionEnum.SET_ALL_RATE_TYPE_ERROR:
      return { ...state, allRateTypeError: action.payload, allRateTypeIsLoading: false };

    case RatesTypeActionEnum.GET_RATE_TYPE:
      return { ...state, rateType: action.payload, rateTypeIsLoading: false };

    case RatesTypeActionEnum.SET_RATE_TYPE_IS_LOADING:
      return { ...state, rateTypeIsLoading: action.payload };

    case RatesTypeActionEnum.SET_RATE_TYPE_ERROR:
      return { ...state, rateTypeError: action.payload, rateTypeIsLoading: false };

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
