import { AppDispatch } from 'store/index';
import { IOrder, IOrderPost } from 'models/IOrder';
import { GetService, PostService } from 'api';
import {
  GetAllOrders,
  GetOrder,
  GetOrdersCount,
  OrderActionEnum,
  SetOrderErrorAction,
  SetOrderId,
  SetOrderIsLoadingAction,
} from './types';

export const OrderActionCreators = {
  getAllOrders: (payload: IOrder[]): GetAllOrders => ({
    type: OrderActionEnum.GET_ALL_ORDERS,
    payload,
  }),
  getOrdersCount: (payload: number): GetOrdersCount => ({
    type: OrderActionEnum.GET_ORDERS_COUNT,
    payload,
  }),
  getOrder: (payload: IOrder): GetOrder => ({
    type: OrderActionEnum.GET_ORDER,
    payload,
  }),
  setOrderId: (payload: string): SetOrderId => ({
    type: OrderActionEnum.SET_ORDER_ID,
    payload,
  }),
  setOrderIsLoading: (payload: boolean): SetOrderIsLoadingAction => ({
    type: OrderActionEnum.SET_ORDER_IS_LOADING,
    payload,
  }),
  setOrderError: (payload: string): SetOrderErrorAction => ({
    type: OrderActionEnum.SET_ORDER_ERROR,
    payload,
  }),
  sendOrder: (data: IOrderPost) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderActionCreators.setOrderIsLoading(true));
      const response = await PostService(process.env.REACT_APP_ORDER_API, data);
      dispatch(OrderActionCreators.getOrder(response.data.data));
      dispatch(OrderActionCreators.setOrderId(response.data.data.id));
      dispatch(OrderActionCreators.setOrderIsLoading(false));
    } catch (e) {
      dispatch(OrderActionCreators.setOrderError('Произошла ошибка при отправке заказа'));
    }
  },
  fetchOrder: (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderActionCreators.setOrderIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_ORDER_API}/${id}`);
      dispatch(OrderActionCreators.getOrder(response.data.data));
      dispatch(OrderActionCreators.setOrderIsLoading(false));
    } catch (e) {
      dispatch(OrderActionCreators.setOrderError('Произошла ошибка при загрузке данных заказа'));
    }
  },
  fetchAllOrders:
    (
      tokenBearer: string,
      limit: number,
      page: number,
      carId?: string | null,
      cityId?: string | null,
      orderStatusId?: string | null,
      color?: string | null
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(OrderActionCreators.setOrderIsLoading(true));
        const response = await GetService(process.env.REACT_APP_ORDER_API, tokenBearer, {
          limit,
          page,
          carId,
          cityId,
          orderStatusId,
          color,
        });
        dispatch(OrderActionCreators.getAllOrders(response.data.data));
        dispatch(OrderActionCreators.getOrdersCount(response.data.count));
        dispatch(OrderActionCreators.setOrderIsLoading(false));
        dispatch(OrderActionCreators.setOrderError(''));
      } catch (e) {
        dispatch(OrderActionCreators.setOrderError('Произошла ошибка при загрузке данных заказа'));
      }
    },
};
