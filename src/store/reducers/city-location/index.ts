import { CityLocationAction, CityLocationActionEnum, CityLocationState } from './types';

const initialState: CityLocationState = {
  city: 'Сочи',
};

export default function CityLocationReducer(state = initialState, action: CityLocationAction) {
  switch (action.type) {
    case CityLocationActionEnum.GET_CITY:
      return { ...state, city: action.payload };
    case CityLocationActionEnum.SET_CITY:
      return { ...state, city: action.payload };
    default:
      return state;
  }
}
