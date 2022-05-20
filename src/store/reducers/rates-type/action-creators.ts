import { AppDispatch } from 'store/index';
import { DeleteService, GetService, PostService, PutService } from 'api';
import { IRateType, IRateTypeCreate } from 'models/IRateType';
import {
  GetRatesType,
  GetRateTypeId,
  RatesTypeActionEnum,
  SetRatesTypeErrorAction,
  SetRatesTypeIsLoadingAction,
  SetRateTypeCreateErrorAction,
  SetRateTypeCreateIsLoadingAction,
  SetRateTypeDeleteErrorAction,
  SetRateTypeDeleteIsLoadingAction,
  SetRateTypeIdErrorAction,
  SetRateTypeIdIsLoadingAction,
  SetRateTypeIsCreateAction,
  SetRateTypeIsDeleteAction,
} from './types';

export const RatesTypeActionCreators = {
  getRatesType: (payload: IRateType[]): GetRatesType => ({
    type: RatesTypeActionEnum.GET_RATES_TYPE,
    payload,
  }),
  setRatesTypeIsLoading: (payload: boolean): SetRatesTypeIsLoadingAction => ({
    type: RatesTypeActionEnum.SET_RATES_TYPE_IS_LOADING,
    payload,
  }),
  setRatesTypeError: (payload: string): SetRatesTypeErrorAction => ({
    type: RatesTypeActionEnum.SET_RATES_TYPE_ERROR,
    payload,
  }),
  getRateTypeId: (payload: IRateType): GetRateTypeId => ({
    type: RatesTypeActionEnum.GET_RATE_TYPE_ID,
    payload,
  }),
  setRateTypeIdIsLoading: (payload: boolean): SetRateTypeIdIsLoadingAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_ID_IS_LOADING,
    payload,
  }),
  setRateTypeIdError: (payload: string): SetRateTypeIdErrorAction => ({
    type: RatesTypeActionEnum.SET_RATE_TYPE_ID_ERROR,
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
      dispatch(RatesTypeActionCreators.setRatesTypeIsLoading(true));
      const response = await GetService(process.env.REACT_APP_RATE_TYPE_API);
      dispatch(RatesTypeActionCreators.getRatesType(response.data.data));
      dispatch(RatesTypeActionCreators.setRatesTypeIsLoading(false));
      dispatch(RatesTypeActionCreators.setRatesTypeError(''));
    } catch (e) {
      dispatch(
        RatesTypeActionCreators.setRatesTypeError(
          'Произошла ошибка при загрузке списка типа тарифов'
        )
      );
    }
  },
  fetchRateTypeId: (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesTypeActionCreators.setRateTypeIdError(''));
      dispatch(RatesTypeActionCreators.setRateTypeIdIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_RATE_TYPE_API}/${id}`);
      dispatch(RatesTypeActionCreators.getRateTypeId(response.data.data));
      dispatch(RatesTypeActionCreators.setRateTypeIdIsLoading(false));
    } catch (e) {
      dispatch(
        RatesTypeActionCreators.setRateTypeIdError('Произошла ошибка при загрузке типа тарифа')
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
    (id: string, data: IRateTypeCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
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
  deleteRateType: (id: string, tokenBearer: string) => async (dispatch: AppDispatch) => {
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
  cleanRateTypeId: () => async (dispatch: AppDispatch) => {
    dispatch(RatesTypeActionCreators.getRateTypeId({} as IRateType));
  },
};
