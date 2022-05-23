import { IOrderStatus } from 'models/IOrderStatus';
import { OrderStatusAction, OrderStatusActionEnum, OrderStatusState } from './types';

const initialState: OrderStatusState = {
  allOrderStatus: [] as IOrderStatus[],
  allOrderStatusError: '',
  allOrderStatusIsLoading: false,
  orderStatus: {} as IOrderStatus,
  orderStatusIsLoading: false,
  orderStatusError: '',
  orderStatusIsCreate: false,
  orderStatusCreateIsLoading: false,
  orderStatusCreateError: '',
  orderStatusIsDelete: false,
  orderStatusDeleteIsLoading: false,
  orderStatusDeleteError: '',
};

export default function OrderStatusReducer(
  state = initialState,
  action: OrderStatusAction
): OrderStatusState {
  switch (action.type) {
    case OrderStatusActionEnum.GET_ALL_ORDER_STATUS:
      return { ...state, allOrderStatus: action.payload };

    case OrderStatusActionEnum.SET_ALL_ORDER_STATUS_IS_LOADING:
      return { ...state, allOrderStatusIsLoading: action.payload };

    case OrderStatusActionEnum.SET_ALL_ORDER_STATUS_ERROR:
      return { ...state, allOrderStatusError: action.payload, allOrderStatusIsLoading: false };

    case OrderStatusActionEnum.GET_ORDER_STATUS:
      return { ...state, orderStatus: action.payload, orderStatusIsLoading: false };

    case OrderStatusActionEnum.SET_ORDER_STATUS_IS_LOADING:
      return { ...state, orderStatusIsLoading: action.payload };

    case OrderStatusActionEnum.SET_ORDER_STATUS_ERROR:
      return { ...state, orderStatusError: action.payload, orderStatusIsLoading: false };

    case OrderStatusActionEnum.SET_ORDER_STATUS_IS_CREATE:
      return { ...state, orderStatusIsCreate: action.payload };

    case OrderStatusActionEnum.SET_ORDER_STATUS_CREATE_IS_LOADING:
      return { ...state, orderStatusCreateIsLoading: action.payload };

    case OrderStatusActionEnum.SET_ORDER_STATUS_CREATE_ERROR:
      return {
        ...state,
        orderStatusCreateError: action.payload,
        orderStatusCreateIsLoading: false,
      };

    case OrderStatusActionEnum.SET_ORDER_STATUS_IS_DELETE:
      return { ...state, orderStatusIsDelete: action.payload };

    case OrderStatusActionEnum.SET_ORDER_STATUS_DELETE_IS_LOADING:
      return { ...state, orderStatusDeleteIsLoading: action.payload };

    case OrderStatusActionEnum.SET_ORDER_STATUS_DELETE_ERROR:
      return {
        ...state,
        orderStatusDeleteError: action.payload,
        orderStatusDeleteIsLoading: false,
      };

    default:
      return state;
  }
}
