import { ICity } from 'models/ICity';
import { CityAction, CityActionEnum, CityState } from './types';

const initialState: CityState = {
  cities: [],
  citiesIsLoading: false,
  citiesError: '',
  city: {} as ICity,
  cityIsLoading: false,
  cityError: '',
  cityIsCreate: false,
  cityCreateIsLoading: false,
  cityCreateError: '',
  cityIsDelete: false,
  cityDeleteIsLoading: false,
  cityDeleteError: '',
};

export default function CityReducer(state = initialState, action: CityAction): CityState {
  switch (action.type) {
    case CityActionEnum.GET_CITIES:
      return { ...state, cities: action.payload, citiesIsLoading: false };

    case CityActionEnum.SET_CITIES_IS_LOADING:
      return { ...state, citiesIsLoading: action.payload };

    case CityActionEnum.SET_CITIES_ERROR:
      return { ...state, citiesError: action.payload, citiesIsLoading: false };

    case CityActionEnum.GET_CITY:
      return { ...state, city: action.payload, cityIsLoading: false };

    case CityActionEnum.SET_CITY_IS_LOADING:
      return { ...state, cityIsLoading: action.payload };

    case CityActionEnum.SET_CITY_ERROR:
      return { ...state, cityError: action.payload, cityIsLoading: false };

    case CityActionEnum.SET_CITY_IS_CREATE:
      return { ...state, cityIsCreate: action.payload };

    case CityActionEnum.SET_CITY_CREATE_IS_LOADING:
      return { ...state, cityCreateIsLoading: action.payload };

    case CityActionEnum.SET_CITY_CREATE_ERROR:
      return { ...state, cityCreateError: action.payload, cityCreateIsLoading: false };

    case CityActionEnum.SET_CITY_IS_DELETE:
      return { ...state, cityIsDelete: action.payload };

    case CityActionEnum.SET_CITY_DELETE_IS_LOADING:
      return { ...state, cityDeleteIsLoading: action.payload };

    case CityActionEnum.SET_CITY_DELETE_ERROR:
      return { ...state, cityDeleteError: action.payload, cityDeleteIsLoading: false };

    default:
      return state;
  }
}
