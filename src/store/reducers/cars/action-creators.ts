import { AppDispatch } from 'store/index';
import { ICar } from 'models/ICar';
import { GetService } from 'api';
import { GetCars, CarsActionEnum, SetCarsErrorAction, SetCarsIsLoadingAction } from './types';

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
};
