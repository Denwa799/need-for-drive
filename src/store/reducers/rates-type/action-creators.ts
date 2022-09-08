import { AppDispatch } from 'store/index';
import { DeleteService, GetService, PostService, PutService } from 'api';
import { IRateType, IRateTypeCreate } from 'models/IRateType';
import {
  GetAllRateType,
  GetRateType,
  RatesTypeActionEnum,
  SetAllRateTypeErrorAction,
  SetAllRateTypeIsLoadingAction,
  SetRateTypeCreateErrorAction,
  SetRateTypeCreateIsLoadingAction,
  SetRateTypeIsDeleteAction,
  SetRateTypeDeleteIsLoadingAction,
  SetRateTypeDeleteErrorAction,
  SetRateTypeErrorAction,
  SetRateTypeIsLoadingAction,
  SetRateTypeIsCreateAction,
} from './types';

export const RatesTypeActionCreators = {
  getAllRateType: (payload: IRateType[]): GetAllRateType => ({
    type: RatesTypeActionEnum.GET_ALL_RATE_TYPE,
    payload,
  }),
  setAllRateTypeIsLoading: (payload: boolean): SetAllRateTypeIsLoadingAction => ({
    type: RatesTypeActionEnum.SET_ALL_RATE_TYPE_IS_LOADING,
    payload,
  }),
  setAllRateTypeError: (payload: string): SetAllRateTypeErrorAction => ({
    type: RatesTypeActionEnum.SET_ALL_RATE_TYPE_ERROR,
    payload,
  }),
  getRateType: (payload: IRateType): GetRateType => ({
    type: RatesTypeActionEnum.GET_RATE_TYPE,
    payload,
  }),
  setRateTypeIsLoading: (payload: boolean): SetRateTypeIsLoadingAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_IS_LOADING,
    payload,
  }),
  setRateTypeError: (payload: string): SetRateTypeErrorAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_ERROR,
    payload,
  }),
  setRateTypeIsCreate: (payload: boolean): SetRateTypeIsCreateAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_IS_CREATE,
    payload,
  }),
  setRateTypeCreateIsLoading: (payload: boolean): SetRateTypeCreateIsLoadingAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_CREATE_IS_LOADING,
    payload,
  }),
  setRateTypeCreateError: (payload: string): SetRateTypeCreateErrorAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_CREATE_ERROR,
    payload,
  }),
  setRateTypeIsDelete: (payload: boolean): SetRateTypeIsDeleteAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_IS_DELETE,
    payload,
  }),
  setRateTypeDeleteIsLoading: (payload: boolean): SetRateTypeDeleteIsLoadingAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_DELETE_IS_LOADING,
    payload,
  }),
  setRateTypeDeleteError: (payload: string): SetRateTypeDeleteErrorAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_DELETE_ERROR,
    payload,
  }),
  fetchRatesType: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesTypeActionCreators.setAllRateTypeError(''));
      dispatch(RatesTypeActionCreators.setAllRateTypeIsLoading(true));
      const response = await GetService(process.env.REACT_APP_RATE_TYPE_API);
      dispatch(RatesTypeActionCreators.getAllRateType(response.data.data));
      dispatch(RatesTypeActionCreators.setAllRateTypeIsLoading(false));
      dispatch(RatesTypeActionCreators.setAllRateTypeError(''));
    } catch (e) {
      dispatch(
        RatesTypeActionCreators.setAllRateTypeError(
          'Произошла ошибка при загрузке списка типа тарифов'
        )
      );
    }
  },
  fetchRateType: (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesTypeActionCreators.setRateTypeError(''));
      dispatch(RatesTypeActionCreators.setRateTypeIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_RATE_TYPE_API}/${id}`);
      dispatch(RatesTypeActionCreators.getRateType(response.data.data));
      dispatch(RatesTypeActionCreators.setRateTypeIsLoading(false));
    } catch (e) {
      dispatch(
        RatesTypeActionCreators.setRateTypeError('Произошла ошибка при загрузке типа тарифа')
      );
    }
  },
  createRateType: (data: IRateTypeCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesTypeActionCreators.setRateTypeCreateError(''));
      dispatch(RatesTypeActionCreators.setRateTypeCreateIsLoading(true));
      dispatch(RatesTypeActionCreators.setRateTypeIsCreate(false));
      await PostService(process.env.REACT_APP_RATE_TYPE_API, data, tokenBearer);
      dispatch(RatesTypeActionCreators.setRateTypeIsCreate(true));
      dispatch(RatesTypeActionCreators.setRateTypeCreateIsLoading(false));
    } catch (e) {
      dispatch(RatesTypeActionCreators.setRateTypeIsCreate(false));
      dispatch(
        RatesTypeActionCreators.setRateTypeCreateError('Произошла ошибка при создании типа тарифа')
      );
    }
  },
  updateRateType:
    (id: number, data: IRateTypeCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(RatesTypeActionCreators.setRateTypeCreateError(''));
        dispatch(RatesTypeActionCreators.setRateTypeCreateIsLoading(true));
        dispatch(RatesTypeActionCreators.setRateTypeIsCreate(false));
        await PutService(`${process.env.REACT_APP_RATE_TYPE_API}/${id}`, data, tokenBearer);
        dispatch(RatesTypeActionCreators.setRateTypeIsCreate(true));
        dispatch(RatesTypeActionCreators.setRateTypeCreateIsLoading(false));
      } catch (e) {
        dispatch(RatesTypeActionCreators.setRateTypeIsCreate(false));
        dispatch(
          RatesTypeActionCreators.setRateTypeCreateError(
            'Произошла ошибка при обновлении типа тарифа'
          )
        );
      }
    },
  deleteRateType: (id: number, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesTypeActionCreators.setRateTypeDeleteError(''));
      dispatch(RatesTypeActionCreators.setRateTypeDeleteIsLoading(true));
      dispatch(RatesTypeActionCreators.setRateTypeIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_RATE_TYPE_API}/${id}`, tokenBearer);
      dispatch(RatesTypeActionCreators.setRateTypeIsDelete(true));
      dispatch(RatesTypeActionCreators.setRateTypeDeleteIsLoading(false));
    } catch (e) {
      dispatch(RatesTypeActionCreators.setRateTypeIsDelete(false));
      dispatch(
        RatesTypeActionCreators.setRateTypeDeleteError('Произошла ошибка при удалении типа тарифа')
      );
    }
  },
  cleanRateType: () => async (dispatch: AppDispatch) => {
    dispatch(RatesTypeActionCreators.getRateType({} as IRateType));
  },
};
