import { AppDispatch } from 'store/index';
import { ICar, ICarCreate } from 'models/ICar';
import { DeleteService, GetService, PostService, PutService } from 'api';
import {
  GetCars,
  CarsActionEnum,
  SetCarsErrorAction,
  SetCarsIsLoadingAction,
  SetCarIsCreateAction,
  SetCarCreateErrorAction,
  GetCar,
  SetCarIsDeleteAction,
  SetCarDeleteErrorAction,
  SetCarDeleteIsLoadingAction,
  SetCarCreateIsLoadingAction,
  SetCarIsLoadingAction,
  SetCarErrorAction,
} from './types';

export const CarsActionCreators = {
  getCars: (payload: ICar[]): GetCars => ({
    type: CarsActionEnum.GET_CARS,
    payload,
  }),
  setCarsIsLoading: (payload: boolean): SetCarsIsLoadingAction => ({
    type: CarsActionEnum.SET_CARS_IS_LOADING,
    payload,
  }),
  setCarsError: (payload: string): SetCarsErrorAction => ({
    type: CarsActionEnum.SET_CARS_ERROR,
    payload,
  }),
  getCar: (payload: ICar): GetCar => ({
    type: CarsActionEnum.GET_CAR,
    payload,
  }),
  setCarIsLoading: (payload: boolean): SetCarIsLoadingAction => ({
    type: CarsActionEnum.SET_CAR_IS_LOADING,
    payload,
  }),
  setCarError: (payload: string): SetCarErrorAction => ({
    type: CarsActionEnum.SET_CAR_ERROR,
    payload,
  }),
  setCarIsCreate: (payload: boolean): SetCarIsCreateAction => ({
    type: CarsActionEnum.SET_CAR_IS_CREATE,
    payload,
  }),
  setCarCreateIsLoading: (payload: boolean): SetCarCreateIsLoadingAction => ({
    type: CarsActionEnum.SET_CAR_CREATE_IS_LOADING,
    payload,
  }),
  setCarCreateError: (payload: string): SetCarCreateErrorAction => ({
    type: CarsActionEnum.SET_CAR_CREATE_ERROR,
    payload,
  }),
  setCarIsDelete: (payload: boolean): SetCarIsDeleteAction => ({
    type: CarsActionEnum.SET_CAR_IS_DELETE,
    payload,
  }),
  setCarDeleteIsLoading: (payload: boolean): SetCarDeleteIsLoadingAction => ({
    type: CarsActionEnum.SET_CAR_DELETE_IS_LOADING,
    payload,
  }),
  setCarDeleteError: (payload: string): SetCarDeleteErrorAction => ({
    type: CarsActionEnum.SET_CAR_DELETE_ERROR,
    payload,
  }),
  fetchCars: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CarsActionCreators.setCarsError(''));
      dispatch(CarsActionCreators.setCarsIsLoading(true));
      const response = await GetService(process.env.REACT_APP_CARS_API);
      dispatch(CarsActionCreators.getCars(response.data.data));
      dispatch(CarsActionCreators.setCarsIsLoading(false));
    } catch (e) {
      dispatch(CarsActionCreators.setCarsError('Произошла ошибка при загрузке машин'));
    }
  },
  fetchCar: (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CarsActionCreators.setCarError(''));
      dispatch(CarsActionCreators.setCarIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_CARS_API}/${id}`);
      dispatch(CarsActionCreators.getCar(response.data.data));
      dispatch(CarsActionCreators.setCarIsLoading(false));
    } catch (e) {
      dispatch(CarsActionCreators.setCarError('Произошла ошибка при загрузке машины'));
    }
  },
  createCar: (data: ICarCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CarsActionCreators.setCarCreateError(''));
      dispatch(CarsActionCreators.setCarCreateIsLoading(true));
      dispatch(CarsActionCreators.setCarIsCreate(false));
      await PostService(process.env.REACT_APP_CARS_API, data, tokenBearer);
      dispatch(CarsActionCreators.setCarIsCreate(true));
      dispatch(CarsActionCreators.setCarCreateIsLoading(false));
    } catch (e) {
      dispatch(CarsActionCreators.setCarIsCreate(false));
      dispatch(CarsActionCreators.setCarCreateError('Произошла ошибка при создании машины'));
    }
  },
  updateCar:
    (id: number, data: ICarCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(CarsActionCreators.setCarCreateError(''));
        dispatch(CarsActionCreators.setCarCreateIsLoading(true));
        dispatch(CarsActionCreators.setCarIsCreate(false));
        await PutService(`${process.env.REACT_APP_CARS_API}/${id}`, data, tokenBearer);
        dispatch(CarsActionCreators.setCarIsCreate(true));
        dispatch(CarsActionCreators.setCarCreateIsLoading(false));
      } catch (e) {
        dispatch(CarsActionCreators.setCarIsCreate(false));
        dispatch(CarsActionCreators.setCarCreateError('Произошла ошибка при обновлении машины'));
      }
    },
  deleteCar: (id: number, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CarsActionCreators.setCarDeleteError(''));
      dispatch(CarsActionCreators.setCarDeleteIsLoading(true));
      dispatch(CarsActionCreators.setCarIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_CARS_API}/${id}`, tokenBearer);
      dispatch(CarsActionCreators.setCarIsDelete(true));
      dispatch(CarsActionCreators.setCarDeleteIsLoading(false));
    } catch (e) {
      dispatch(CarsActionCreators.setCarIsDelete(false));
      dispatch(CarsActionCreators.setCarDeleteError('Произошла ошибка при удалении машины'));
    }
  },
  clearCar: () => (dispatch: AppDispatch) => {
    dispatch(CarsActionCreators.getCar({} as ICar));
  },
};
