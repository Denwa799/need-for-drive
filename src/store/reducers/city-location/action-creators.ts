import { CityLocationActionEnum, GetCityLocation, SetCityLocation } from './types';

export const CityLocationActionCreators = {
  getCityLocation: (payload: string): GetCityLocation => ({
    type: CityLocationActionEnum.GET_CITY,
    payload,
  }),
  setCityLocation: (payload: string): SetCityLocation => ({
    type: CityLocationActionEnum.SET_CITY,
    payload,
  }),
};
