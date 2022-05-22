import { AppDispatch } from 'store/index';
import { IOrder, IOrderPost } from 'models/IOrder';
import { DeleteService, GetService, PostService, PutService } from 'api';
import {
  GetAllOrders,
  GetOrder,
  GetOrdersCount,
  OrderActionEnum,
  SetOrdersErrorAction,
  SetOrderId,
  SetOrdersIsLoadingAction,
  SetOrderIsLoadingAction,
  SetOrderErrorAction,
  SetOrderIsCreateAction,
  SetOrderCreateIsLoadingAction,
  SetOrderCreateErrorAction,
  SetOrderIsDeleteAction,
  SetOrderDeleteErrorAction,
  SetOrderDeleteIsLoadingAction,
} from './types';

export const OrderActionCreators = {
  getAllOrders: (payload: IOrder[]): GetAllOrders => ({
    type: OrderActionEnum.GET_ALL_ORDERS,
    payload,
  }),
  setOrdersIsLoading: (payload: boolean): SetOrdersIsLoadingAction => ({
    type: OrderActionEnum.SET_ORDERS_IS_LOADING,
    payload,
  }),
  setOrdersError: (payload: string): SetOrdersErrorAction => ({
    type: OrderActionEnum.SET_ORDERS_ERROR,
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
  setOrderIsCreate: (payload: boolean): SetOrderIsCreateAction => ({
    type: OrderActionEnum.SET_ORDER_IS_CREATE,
    payload,
  }),
  setOrderCreateIsLoading: (payload: boolean): SetOrderCreateIsLoadingAction => ({
    type: OrderActionEnum.SET_ORDER_CREATE_IS_LOADING,
    payload,
  }),
  setOrderCreateError: (payload: string): SetOrderCreateErrorAction => ({
    type: OrderActionEnum.SET_ORDER_CREATE_ERROR,
    payload,
  }),
  setOrderIsDelete: (payload: boolean): SetOrderIsDeleteAction => ({
    type: OrderActionEnum.SET_ORDER_IS_DELETE,
    payload,
  }),
  setOrderDeleteIsLoading: (payload: boolean): SetOrderDeleteIsLoadingAction => ({
    type: OrderActionEnum.SET_ORDER_DELETE_IS_LOADING,
    payload,
  }),
  setOrderDeleteError: (payload: string): SetOrderDeleteErrorAction => ({
    type: OrderActionEnum.SET_ORDER_DELETE_ERROR,
    payload,
  }),
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
        dispatch(OrderActionCreators.setOrdersIsLoading(true));
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
        dispatch(OrderActionCreators.setOrdersIsLoading(false));
        dispatch(OrderActionCreators.setOrdersError(''));
      } catch (e) {
        dispatch(OrderActionCreators.setOrdersError('Произошла ошибка при загрузке данных заказа'));
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
  sendOrder: (data: IOrderPost) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderActionCreators.setOrderCreateIsLoading(true));
      const response = await PostService(process.env.REACT_APP_ORDER_API, data);
      dispatch(OrderActionCreators.getOrder(response.data.data));
      dispatch(OrderActionCreators.setOrderId(response.data.data.id));
      dispatch(OrderActionCreators.setOrderCreateIsLoading(false));
    } catch (e) {
      dispatch(OrderActionCreators.setOrderCreateError('Произошла ошибка при отправке заказа'));
    }
  },
  updateOrder:
    (id: string, data: IOrderPost, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(OrderActionCreators.setOrderCreateError(''));
        dispatch(OrderActionCreators.setOrderCreateIsLoading(true));
        dispatch(OrderActionCreators.setOrderIsCreate(false));
        await PutService(`${process.env.REACT_APP_ORDER_API}/${id}`, data, tokenBearer);
        dispatch(OrderActionCreators.setOrderIsCreate(true));
        dispatch(OrderActionCreators.setOrderCreateIsLoading(false));
      } catch (e) {
        dispatch(OrderActionCreators.setOrderIsCreate(false));
        dispatch(OrderActionCreators.setOrderCreateError('Произошла ошибка при обновлении заказа'));
      }
    },
  deleteOrder: (id: string, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderActionCreators.setOrderDeleteError(''));
      dispatch(OrderActionCreators.setOrderDeleteIsLoading(true));
      dispatch(OrderActionCreators.setOrderIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_ORDER_API}/${id}`, tokenBearer);
      dispatch(OrderActionCreators.setOrderIsDelete(true));
      dispatch(OrderActionCreators.setOrderDeleteIsLoading(false));
    } catch (e) {
      dispatch(OrderActionCreators.setOrderIsDelete(false));
      dispatch(OrderActionCreators.setOrderDeleteError('Произошла ошибка при удалении заказа'));
    }
  },
  cleanOrder: () => async (dispatch: AppDispatch) => {
    dispatch(OrderActionCreators.getOrder({} as IOrder));
  },
};
