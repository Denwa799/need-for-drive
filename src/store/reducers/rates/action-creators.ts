import { AppDispatch } from 'store/index';
import { GetService } from 'api';
import { IRate } from 'models/IRate';
import { GetRates, RatesActionEnum, SetRatesErrorAction, SetRatesIsLoadingAction } from './types';

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
  fetchRates: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(RatesActionCreators.setRatesIsLoading(true));
      const response = await GetService(process.env.REACT_APP_RATE_API);
      dispatch(RatesActionCreators.getRates(response.data.data));
      dispatch(RatesActionCreators.setRatesIsLoading(false));
    } catch (e) {
      dispatch(RatesActionCreators.setRatesError('Произошла ошибка при загрузке списка тарифов'));
    }
  },
};
