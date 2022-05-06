import { IOrderStatus } from 'models/IOrderStatus';
import { OrderStatusAction, OrderStatusActionEnum, OrderStatusState } from './types';

const initialState: OrderStatusState = {
  allOrderStatus: [] as IOrderStatus[],
  orderStatusError: '',
  orderStatusIsLoading: false,
};

export default function OrderStatusReducer(
  state = initialState,
  action: OrderStatusAction
): OrderStatusState {
  switch (action.type) {
    case OrderStatusActionEnum.GET_ALL_ORDER_STATUS:
      return { ...state, allOrderStatus: action.payload };

    case OrderStatusActionEnum.SET_ORDER_STATUS_IS_LOADING:
      return { ...state, orderStatusIsLoading: action.payload };

    case OrderStatusActionEnum.SET_ORDER_STATUS_ERROR:
      return { ...state, orderStatusError: action.payload, orderStatusIsLoading: false };

    default:
      return state;
  }
}
