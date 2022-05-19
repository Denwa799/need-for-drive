import { DeleteService, GetService, PostService, PutService } from 'api';
import { ICity, ICityCreate } from 'models/ICity';
import { AppDispatch } from 'store';
import {
  CityActionEnum,
  GetCity,
  GetCityId,
  SetCityCreateErrorAction,
  SetCityCreateIsLoadingAction,
  SetCityDeleteErrorAction,
  SetCityDeleteIsLoadingAction,
  SetCityErrorAction,
  SetCityIdErrorAction,
  SetCityIdIsLoadingAction,
  SetCityIsCreateAction,
  SetCityIsDeleteAction,
  SetCityIsLoadingAction,
} from './types';

export const CityActionCreators = {
  getCity: (payload: ICity[]): GetCity => ({
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
  getCityId: (payload: ICity): GetCityId => ({
    type: CityActionEnum.GET_CITY_ID,
    payload,
  }),
  setCityIdIsLoading: (payload: boolean): SetCityIdIsLoadingAction => ({
    type: CityActionEnum.SET_CITY_ID_IS_LOADING,
    payload,
  }),
  setCityIdError: (payload: string): SetCityIdErrorAction => ({
    type: CityActionEnum.SET_CITY_ID_ERROR,
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
  fetchCity: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CityActionCreators.setCityIsLoading(true));
      const response = await GetService(process.env.REACT_APP_MAP_CITY_API);
      dispatch(CityActionCreators.getCity(response.data.data));
      dispatch(CityActionCreators.setCityIsLoading(false));
    } catch (e) {
      dispatch(CityActionCreators.setCityError('Произошла ошибка при загрузке списка городов'));
    }
  },
  fetchCityId: (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CityActionCreators.setCityIdError(''));
      dispatch(CityActionCreators.setCityIdIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_MAP_CITY_API}/${id}`);
      dispatch(CityActionCreators.getCityId(response.data.data));
      dispatch(CityActionCreators.setCityIdIsLoading(false));
    } catch (e) {
      dispatch(CityActionCreators.setCityIdError('Произошла ошибка при загрузке города'));
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
  cleanCityId: () => async (dispatch: AppDispatch) => {
    dispatch(CityActionCreators.getCityId({} as ICity));
  },
};
