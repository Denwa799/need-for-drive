import { AppDispatch } from 'store/index';
import { GetService } from 'api';
import { IRateType } from 'models/IRateType';
import {
  GetRatesType,
  RatesTypeActionEnum,
  SetRatesTypeErrorAction,
  SetRatesTypeIsLoadingAction,
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
};
