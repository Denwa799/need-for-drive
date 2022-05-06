import { IOrder } from 'models/IOrder';
import { OrderAction, OrderActionEnum, OrderState } from './types';

const initialState: OrderState = {
  orders: [] as IOrder[],
  ordersCount: 0,
  order: {} as IOrder,
  orderId: '',
  orderError: '',
  orderIsLoading: false,
};

export default function OrderReducer(state = initialState, action: OrderAction): OrderState {
  switch (action.type) {
    case OrderActionEnum.GET_ALL_ORDERS:
      return { ...state, orders: action.payload };

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

    default:
      return state;
  }
}
