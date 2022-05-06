import { CityAction, CityActionEnum, CityState } from './types';

const initialState: CityState = {
  city: [],
  cityError: '',
  cityIsLoading: true,
};

export default function CityReducer(state = initialState, action: CityAction): CityState {
  switch (action.type) {
    case CityActionEnum.GET_CITY:
      return { ...state, city: action.payload, cityIsLoading: false };

    case CityActionEnum.SET_CITY_IS_LOADING:
      return { ...state, cityIsLoading: action.payload };

    case CityActionEnum.SET_CITY_ERROR:
      return { ...state, cityError: action.payload, cityIsLoading: false };

    default:
      return state;
  }
}
