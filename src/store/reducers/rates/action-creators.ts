import { AppDispatch } from 'store/index';
import { DeleteService, GetService, PostService, PutService } from 'api';
import { IRate, IRateCreate } from 'models/IRate';
import {
  GetRate,
  GetRates,
  RatesActionEnum,
  SetRateCreateErrorAction,
  SetRateCreateIsLoadingAction,
  SetRateDeleteErrorAction,
  SetRateDeleteIsLoadingAction,
  SetRateErrorAction,
  SetRateIsLoadingAction,
  SetRateIsCreateAction,
  SetRateIsDeleteAction,
  SetRatesErrorAction,
  SetRatesIsLoadingAction,
} from './types';

export const RatesActionCreators = {
  getRates: (payload: IRate[]): GetRates => ({
    type: RatesActionEnum.GET_RATES,
    payload,
  }),
  setRatesIsLoading: (payload: boolean): SetRatesIsLoadingAction => ({
    type: RatesActionEnum.SET_RATES_IS_LOADING,
    payload,
  }),
  setRatesError: (payload: string): SetRatesErrorAction => ({
    type: RatesActionEnum.SET_RATES_ERROR,
    payload,
  }),
  getRate: (payload: IRate): GetRate => ({
    type: RatesActionEnum.GET_RATE,
    payload,
  }),
  setRateIsLoading: (payload: boolean): SetRateIsLoadingAction => ({
    type: RatesActionEnum.SET_RATE_IS_LOADING,
    payload,
  }),
  setRateError: (payload: string): SetRateErrorAction => ({
    type: RatesActionEnum.SET_RATE_ERROR,
    payload,
  }),
  setRateIsCreate: (payload: boolean): SetRateIsCreateAction => ({
    type: RatesActionEnum.SET_RATE_IS_CREATE,
    payload,
  }),
  setRateCreateIsLoading: (payload: boolean): SetRateCreateIsLoadingAction => ({
    type: RatesActionEnum.SET_RATE_CREATE_IS_LOADING,
    payload,
  }),
  setRateCreateError: (payload: string): SetRateCreateErrorAction => ({
    type: RatesActionEnum.SET_RATE_CREATE_ERROR,
    payload,
  }),
  setRateIsDelete: (payload: boolean): SetRateIsDeleteAction => ({
    type: RatesActionEnum.SET_RATE_IS_DELETE,
    payload,
  }),
  setRateDeleteIsLoading: (payload: boolean): SetRateDeleteIsLoadingAction => ({
    type: RatesActionEnum.SET_RATE_DELETE_IS_LOADING,
    payload,
  }),
  setRateDeleteError: (payload: string): SetRateDeleteErrorAction => ({
    type: RatesActionEnum.SET_RATE_DELETE_ERROR,
    payload,
  }),
  fetchRates: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesActionCreators.setRatesError(''));
      dispatch(RatesActionCreators.setRatesIsLoading(true));
      const response = await GetService(process.env.REACT_APP_RATE_API);
      dispatch(RatesActionCreators.getRates(response.data.data));
      dispatch(RatesActionCreators.setRatesIsLoading(false));
    } catch (e) {
      dispatch(RatesActionCreators.setRatesError('Произошла ошибка при загрузке списка тарифов'));
    }
  },
  fetchRate: (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesActionCreators.setRateError(''));
      dispatch(RatesActionCreators.setRateIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_RATE_API}/${id}`);
      dispatch(RatesActionCreators.getRate(response.data.data));
      dispatch(RatesActionCreators.setRateIsLoading(false));
    } catch (e) {
      dispatch(RatesActionCreators.setRateError('Произошла ошибка при загрузке тарифа'));
    }
  },
  createRate: (data: IRateCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesActionCreators.setRateCreateError(''));
      dispatch(RatesActionCreators.setRateCreateIsLoading(true));
      dispatch(RatesActionCreators.setRateIsCreate(false));
      await PostService(process.env.REACT_APP_RATE_API, data, tokenBearer);
      dispatch(RatesActionCreators.setRateIsCreate(true));
      dispatch(RatesActionCreators.setRateCreateIsLoading(false));
    } catch (e) {
      dispatch(RatesActionCreators.setRateIsCreate(false));
      dispatch(RatesActionCreators.setRateCreateError('Произошла ошибка при создании тарифа'));
    }
  },
  updateRate:
    (id: number, data: IRateCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(RatesActionCreators.setRateCreateError(''));
        dispatch(RatesActionCreators.setRateCreateIsLoading(true));
        dispatch(RatesActionCreators.setRateIsCreate(false));
        await PutService(`${process.env.REACT_APP_RATE_API}/${id}`, data, tokenBearer);
        dispatch(RatesActionCreators.setRateIsCreate(true));
        dispatch(RatesActionCreators.setRateCreateIsLoading(false));
      } catch (e) {
        dispatch(RatesActionCreators.setRateIsCreate(false));
        dispatch(RatesActionCreators.setRateCreateError('Произошла ошибка при обновлении тарифа'));
      }
    },
  deleteRate: (id: number, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesActionCreators.setRateDeleteError(''));
      dispatch(RatesActionCreators.setRateDeleteIsLoading(true));
      dispatch(RatesActionCreators.setRateIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_RATE_API}/${id}`, tokenBearer);
      dispatch(RatesActionCreators.setRateIsDelete(true));
      dispatch(RatesActionCreators.setRateDeleteIsLoading(false));
    } catch (e) {
      dispatch(RatesActionCreators.setRateIsDelete(false));
      dispatch(RatesActionCreators.setRateDeleteError('Произошла ошибка при удалении тарифа'));
    }
  },
  cleanRate: () => async (dispatch: AppDispatch) => {
    dispatch(RatesActionCreators.getRate({} as IRate));
  },
};
