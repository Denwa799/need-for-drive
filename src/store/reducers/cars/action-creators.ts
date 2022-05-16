import { AppDispatch } from 'store/index';
import { ICar, ICarCreate } from 'models/ICar';
import { GetService, PostService } from 'api';
import {
  GetCars,
  CarsActionEnum,
  SetCarsErrorAction,
  SetCarsIsLoadingAction,
  SetCarIsCreateAction,
  SetCarCreateErrorAction,
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
  setCarIsCreate: (payload: boolean): SetCarIsCreateAction => ({
    type: CarsActionEnum.SET_CAR_IS_CREATE,
    payload,
  }),
  setCarCreateError: (payload: string): SetCarCreateErrorAction => ({
    type: CarsActionEnum.SET_CAR_CREATE_ERROR,
    payload,
  }),
  fetchCars: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CarsActionCreators.setCarsIsLoading(true));
      const response = await GetService(process.env.REACT_APP_CARS_API);
      dispatch(CarsActionCreators.getCars(response.data.data));
      dispatch(CarsActionCreators.setCarsIsLoading(false));
    } catch (e) {
      dispatch(CarsActionCreators.setCarsError('Произошла ошибка при загрузке машин'));
    }
  },
  createCar: (data: ICarCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CarsActionCreators.setCarCreateError(''));
      dispatch(CarsActionCreators.setCarsIsLoading(true));
      dispatch(CarsActionCreators.setCarIsCreate(false));
      await PostService(process.env.REACT_APP_CARS_API, data, tokenBearer);
      dispatch(CarsActionCreators.setCarIsCreate(true));
      dispatch(CarsActionCreators.setCarsIsLoading(false));
    } catch (e) {
      dispatch(CarsActionCreators.setCarIsCreate(false));
      dispatch(CarsActionCreators.setCarCreateError('Произошла ошибка при создании машины'));
    }
  },
};
