import { IOrder } from 'models/IOrder';
import { OrderAction, OrderActionEnum, OrderState } from './types';

const initialState: OrderState = {
  orders: [] as IOrder[],
  ordersIsLoading: false,
  ordersError: '',
  ordersCount: 0,
  order: {} as IOrder,
  orderId: '',
  orderIsLoading: false,
  orderError: '',
  orderIsCreate: false,
  orderCreateIsLoading: false,
  orderCreateError: '',
  orderIsDelete: false,
  orderDeleteIsLoading: false,
  orderDeleteError: '',
};

export default function OrderReducer(state = initialState, action: OrderAction): OrderState {
  switch (action.type) {
    case OrderActionEnum.GET_ALL_ORDERS:
      return { ...state, orders: action.payload };

    case OrderActionEnum.SET_ORDERS_IS_LOADING:
      return { ...state, ordersIsLoading: action.payload };

    case OrderActionEnum.SET_ORDERS_ERROR:
      return { ...state, ordersError: action.payload, ordersIsLoading: false };

    case OrderActionEnum.GET_ORDERS_COUNT:
      return { ...state, ordersCount: action.payload };

    case OrderActionEnum.GET_ORDER:
      return { ...state, order: action.payload };

    case OrderActionEnum.SET_ORDER_ID:
      return { ...state, orderId: action.payload };

    case OrderActionEnum.SET_ORDER_IS_LOADING:
      return { ...state, orderIsLoading: action.payload };

    case OrderActionEnum.SET_ORDER_ERROR:
      return { ...state, orderError: action.payload, orderIsLoading: false };

    case OrderActionEnum.SET_ORDER_IS_CREATE:
      return { ...state, orderIsCreate: action.payload };

    case OrderActionEnum.SET_ORDER_CREATE_IS_LOADING:
      return { ...state, orderCreateIsLoading: action.payload };

    case OrderActionEnum.SET_ORDER_CREATE_ERROR:
      return { ...state, orderCreateError: action.payload, orderCreateIsLoading: false };

    case OrderActionEnum.SET_ORDER_IS_DELETE:
      return { ...state, orderIsDelete: action.payload };

    case OrderActionEnum.SET_ORDER_DELETE_IS_LOADING:
      return { ...state, orderDeleteIsLoading: action.payload };

    case OrderActionEnum.SET_ORDER_DELETE_ERROR:
      return { ...state, orderDeleteError: action.payload, orderDeleteIsLoading: false };

    default:
      return state;
  }
}
