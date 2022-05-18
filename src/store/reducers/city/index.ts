import { ICity } from 'models/ICity';
import { CityAction, CityActionEnum, CityState } from './types';

const initialState: CityState = {
  city: [],
  cityError: '',
  cityIsLoading: false,
  cityId: {} as ICity,
  cityIdIsLoading: false,
  cityIdError: '',
  cityIsCreate: false,
  cityCreateIsLoading: false,
  cityCreateError: '',
  cityIsDelete: false,
  cityDeleteIsLoading: false,
  cityDeleteError: '',
};

export default function CityReducer(state = initialState, action: CityAction): CityState {
  switch (action.type) {
    case CityActionEnum.GET_CITY:
      return { ...state, city: action.payload, cityIsLoading: false };

    case CityActionEnum.SET_CITY_IS_LOADING:
      return { ...state, cityIsLoading: action.payload };

    case CityActionEnum.SET_CITY_ERROR:
      return { ...state, cityError: action.payload, cityIsLoading: false };

    case CityActionEnum.GET_CITY_ID:
      return { ...state, cityId: action.payload, cityIdIsLoading: false };

    case CityActionEnum.SET_CITY_ID_IS_LOADING:
      return { ...state, cityIdIsLoading: action.payload };

    case CityActionEnum.SET_CITY_ID_ERROR:
      return { ...state, cityIdError: action.payload, cityIdIsLoading: false };

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
