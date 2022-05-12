import { RatesAction, RatesActionEnum, RatesState } from './types';

const initialState: RatesState = {
  rates: [],
  ratesError: '',
  ratesIsLoading: false,
};

export default function RatesReducer(state = initialState, action: RatesAction): RatesState {
  switch (action.type) {
    case RatesActionEnum.GET_RATES:
      return { ...state, rates: action.payload, ratesIsLoading: false };

    case RatesActionEnum.SET_RATES_IS_LOADING:
      return { ...state, ratesIsLoading: action.payload };

    case RatesActionEnum.SET_RATES_ERROR:
      return { ...state, ratesError: action.payload, ratesIsLoading: false };

    default:
      return state;
  }
}
