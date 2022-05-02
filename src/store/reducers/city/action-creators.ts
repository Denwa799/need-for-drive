import { GetService } from 'api';
import { ICity } from 'models/ICity';
import { AppDispatch } from 'store';
import { CityActionEnum, GetCity, SetCityErrorAction, SetCityIsLoadingAction } from './types';

export const CityActionCreators = {
  getCity: (payload: ICity[]): GetCity => ({
    type: CityActionEnum.GET_CITY,
    payload,
  }),
  setCityIsLoading: (payload: boolean): SetCityIsLoadingAction => ({
    type: CityActionEnum.SET_CITY_IS_LOADING,
    payload,
  }),
  seCityError: (payload: string): SetCityErrorAction => ({
    type: CityActionEnum.SET_CITY_ERROR,
    payload,
  }),
  fetchCity: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CityActionCreators.setCityIsLoading(true));
      const response = await GetService(process.env.REACT_APP_MAP_CITY_API);
      dispatch(CityActionCreators.getCity(response.data.data));
      dispatch(CityActionCreators.setCityIsLoading(false));
    } catch (e) {
      dispatch(CityActionCreators.seCityError('Произошла ошибка при загрузке списка городов'));
    }
  },
};
