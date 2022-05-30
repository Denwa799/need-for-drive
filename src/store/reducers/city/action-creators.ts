import { DeleteService, GetService, PostService, PutService } from 'api';
import { ICity, ICityCreate } from 'models/ICity';
import { AppDispatch } from 'store';
import {
  CityActionEnum,
  GetCities,
  GetCity,
  SetCitiesErrorAction,
  SetCitiesIsLoadingAction,
  SetCityCreateErrorAction,
  SetCityCreateIsLoadingAction,
  SetCityDeleteErrorAction,
  SetCityDeleteIsLoadingAction,
  SetCityErrorAction,
  SetCityIsCreateAction,
  SetCityIsDeleteAction,
  SetCityIsLoadingAction,
} from './types';

export const CityActionCreators = {
  getCities: (payload: ICity[]): GetCities => ({
    type: CityActionEnum.GET_CITIES,
    payload,
  }),
  setCitiesIsLoading: (payload: boolean): SetCitiesIsLoadingAction => ({
    type: CityActionEnum.SET_CITIES_IS_LOADING,
    payload,
  }),
  setCitiesError: (payload: string): SetCitiesErrorAction => ({
    type: CityActionEnum.SET_CITIES_ERROR,
    payload,
  }),
  getCity: (payload: ICity): GetCity => ({
    type: CityActionEnum.GET_CITY,
    payload,
  }),
  setCityIsLoading: (payload: boolean): SetCityIsLoadingAction => ({
    type: CityActionEnum.SET_CITY_IS_LOADING,
    payload,
  }),
  setCityError: (payload: string): SetCityErrorAction => ({
    type: CityActionEnum.SET_CITY_ERROR,
    payload,
  }),
  setCityIsCreate: (payload: boolean): SetCityIsCreateAction => ({
    type: CityActionEnum.SET_CITY_IS_CREATE,
    payload,
  }),
  setCityCreateIsLoading: (payload: boolean): SetCityCreateIsLoadingAction => ({
    type: CityActionEnum.SET_CITY_CREATE_IS_LOADING,
    payload,
  }),
  setCityCreateError: (payload: string): SetCityCreateErrorAction => ({
    type: CityActionEnum.SET_CITY_CREATE_ERROR,
    payload,
  }),
  setCityIsDelete: (payload: boolean): SetCityIsDeleteAction => ({
    type: CityActionEnum.SET_CITY_IS_DELETE,
    payload,
  }),
  setCityDeleteIsLoading: (payload: boolean): SetCityDeleteIsLoadingAction => ({
    type: CityActionEnum.SET_CITY_DELETE_IS_LOADING,
    payload,
  }),
  setCityDeleteError: (payload: string): SetCityDeleteErrorAction => ({
    type: CityActionEnum.SET_CITY_DELETE_ERROR,
    payload,
  }),
  fetchCities: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CityActionCreators.setCitiesError(''));
      dispatch(CityActionCreators.setCitiesIsLoading(true));
      const response = await GetService(process.env.REACT_APP_MAP_CITY_API);
      dispatch(CityActionCreators.getCities(response.data.data));
      dispatch(CityActionCreators.setCitiesIsLoading(false));
    } catch (e) {
      dispatch(CityActionCreators.setCitiesError('Произошла ошибка при загрузке списка городов'));
    }
  },
  fetchCity: (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CityActionCreators.setCityError(''));
      dispatch(CityActionCreators.setCityIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_MAP_CITY_API}ОШИБКА/${id}`);
      dispatch(CityActionCreators.getCity(response.data.data));
      dispatch(CityActionCreators.setCityIsLoading(false));
    } catch (e) {
      dispatch(CityActionCreators.setCityError('Произошла ошибка при загрузке города'));
    }
  },
  createCity: (data: ICityCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CityActionCreators.setCityCreateError(''));
      dispatch(CityActionCreators.setCityCreateIsLoading(true));
      dispatch(CityActionCreators.setCityIsCreate(false));
      await PostService(process.env.REACT_APP_MAP_CITY_API, data, tokenBearer);
      dispatch(CityActionCreators.setCityIsCreate(true));
      dispatch(CityActionCreators.setCityCreateIsLoading(false));
    } catch (e) {
      dispatch(CityActionCreators.setCityIsCreate(false));
      dispatch(CityActionCreators.setCityCreateError('Произошла ошибка при создании города'));
    }
  },
  updateCity:
    (id: string, data: ICityCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(CityActionCreators.setCityCreateError(''));
        dispatch(CityActionCreators.setCityCreateIsLoading(true));
        dispatch(CityActionCreators.setCityIsCreate(false));
        await PutService(`${process.env.REACT_APP_MAP_CITY_API}/${id}`, data, tokenBearer);
        dispatch(CityActionCreators.setCityIsCreate(true));
        dispatch(CityActionCreators.setCityCreateIsLoading(false));
      } catch (e) {
        dispatch(CityActionCreators.setCityIsCreate(false));
        dispatch(CityActionCreators.setCityCreateError('Произошла ошибка при обновлении города'));
      }
    },
  deleteCity: (id: string, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CityActionCreators.setCityDeleteError(''));
      dispatch(CityActionCreators.setCityDeleteIsLoading(true));
      dispatch(CityActionCreators.setCityIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_MAP_CITY_API}/${id}`, tokenBearer);
      dispatch(CityActionCreators.setCityIsDelete(true));
      dispatch(CityActionCreators.setCityDeleteIsLoading(false));
    } catch (e) {
      dispatch(CityActionCreators.setCityIsDelete(false));
      dispatch(CityActionCreators.setCityDeleteError('Произошла ошибка при удалении города'));
    }
  },
  cleanCity: () => async (dispatch: AppDispatch) => {
    dispatch(CityActionCreators.getCity({} as ICity));
  },
};
