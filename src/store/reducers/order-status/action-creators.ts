import { AppDispatch } from 'store/index';
import { IOrderStatus } from 'models/IOrderStatus';
import { GetService } from 'api';
import {
  GetAllOrderStatus,
  OrderStatusActionEnum,
  SetOrderStatusErrorAction,
  SetOrderStatusIsLoadingAction,
} from './types';

export const OrderStatusActionCreators = {
  getAllOrderStatus: (payload: IOrderStatus[]): GetAllOrderStatus => ({
    type: OrderStatusActionEnum.GET_ALL_ORDER_STATUS,
    payload,
  }),
  setOrderStatusIsLoading: (payload: boolean): SetOrderStatusIsLoadingAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_IS_LOADING,
    payload,
  }),
  setOrderStatusError: (payload: string): SetOrderStatusErrorAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_ERROR,
    payload,
  }),
  fetchAllOrderStatus: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderStatusActionCreators.setOrderStatusIsLoading(true));
      const response = await GetService(process.env.REACT_APP_ORDER_STATUS_API);
      dispatch(OrderStatusActionCreators.getAllOrderStatus(response.data.data));
      dispatch(OrderStatusActionCreators.setOrderStatusIsLoading(false));
    } catch (e) {
      dispatch(
        OrderStatusActionCreators.setOrderStatusError(
          'Произошла ошибка при загрузке статуса заказа'
        )
      );
    }
  },
};
