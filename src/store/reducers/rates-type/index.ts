import { RatesTypeAction, RatesTypeActionEnum, RatesTypeState } from './types';

const initialState: RatesTypeState = {
  ratesType: [],
  ratesTypeError: '',
  ratesTypeIsLoading: true,
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

    default:
      return state;
  }
}
