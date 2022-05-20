import { AppDispatch } from 'store/index';
import { IOrderStatus, IOrderStatusCreate } from 'models/IOrderStatus';
import { DeleteService, GetService, PostService, PutService } from 'api';
import {
  GetAllOrderStatus,
  GetOrderStatusId,
  OrderStatusActionEnum,
  SetOrderStatusCreateErrorAction,
  SetOrderStatusCreateIsLoadingAction,
  SetOrderStatusDeleteErrorAction,
  SetOrderStatusDeleteIsLoadingAction,
  SetOrderStatusErrorAction,
  SetOrderStatusIdErrorAction,
  SetOrderStatusIdIsLoadingAction,
  SetOrderStatusIsCreateAction,
  SetOrderStatusIsDeleteAction,
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
  getOrderStatusId: (payload: IOrderStatus): GetOrderStatusId => ({
    type: OrderStatusActionEnum.GET_ORDER_STATUS_ID,
    payload,
  }),
  setOrderStatusIdIsLoading: (payload: boolean): SetOrderStatusIdIsLoadingAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_ID_IS_LOADING,
    payload,
  }),
  setOrderStatusIdError: (payload: string): SetOrderStatusIdErrorAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_ID_ERROR,
    payload,
  }),
  setOrderStatusIsCreate: (payload: boolean): SetOrderStatusIsCreateAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_IS_CREATE,
    payload,
  }),
  setOrderStatusCreateIsLoading: (payload: boolean): SetOrderStatusCreateIsLoadingAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_CREATE_IS_LOADING,
    payload,
  }),
  setOrderStatusCreateError: (payload: string): SetOrderStatusCreateErrorAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_CREATE_ERROR,
    payload,
  }),
  setOrderStatusIsDelete: (payload: boolean): SetOrderStatusIsDeleteAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_IS_DELETE,
    payload,
  }),
  setOrderStatusDeleteIsLoading: (payload: boolean): SetOrderStatusDeleteIsLoadingAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_DELETE_IS_LOADING,
    payload,
  }),
  setOrderStatusDeleteError: (payload: string): SetOrderStatusDeleteErrorAction => ({
    type: OrderStatusActionEnum.SET_ORDER_STATUS_DELETE_ERROR,
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
  fetchOrderStatusId: (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderStatusActionCreators.setOrderStatusIdError(''));
      dispatch(OrderStatusActionCreators.setOrderStatusIdIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_ORDER_STATUS_API}/${id}`);
      dispatch(OrderStatusActionCreators.getOrderStatusId(response.data.data));
      dispatch(OrderStatusActionCreators.setOrderStatusIdIsLoading(false));
    } catch (e) {
      dispatch(
        OrderStatusActionCreators.setOrderStatusIdError(
          'Произошла ошибка при загрузке статуса заказа'
        )
      );
    }
  },
  createOrderStatus:
    (data: IOrderStatusCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(OrderStatusActionCreators.setOrderStatusCreateError(''));
        dispatch(OrderStatusActionCreators.setOrderStatusCreateIsLoading(true));
        dispatch(OrderStatusActionCreators.setOrderStatusIsCreate(false));
        await PostService(process.env.REACT_APP_ORDER_STATUS_API, data, tokenBearer);
        dispatch(OrderStatusActionCreators.setOrderStatusIsCreate(true));
        dispatch(OrderStatusActionCreators.setOrderStatusCreateIsLoading(false));
      } catch (e) {
        dispatch(OrderStatusActionCreators.setOrderStatusIsCreate(false));
        dispatch(
          OrderStatusActionCreators.setOrderStatusCreateError(
            'Произошла ошибка при создании статуса заказа'
          )
        );
      }
    },
  updateOrderStatus:
    (id: string, data: IOrderStatusCreate, tokenBearer: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(OrderStatusActionCreators.setOrderStatusCreateError(''));
        dispatch(OrderStatusActionCreators.setOrderStatusCreateIsLoading(true));
        dispatch(OrderStatusActionCreators.setOrderStatusIsCreate(false));
        await PutService(`${process.env.REACT_APP_ORDER_STATUS_API}/${id}`, data, tokenBearer);
        dispatch(OrderStatusActionCreators.setOrderStatusIsCreate(true));
        dispatch(OrderStatusActionCreators.setOrderStatusCreateIsLoading(false));
      } catch (e) {
        dispatch(OrderStatusActionCreators.setOrderStatusIsCreate(false));
        dispatch(
          OrderStatusActionCreators.setOrderStatusCreateError(
            'Произошла ошибка при обновлении статуса заказа'
          )
        );
      }
    },
  deleteOrderStatus: (id: string, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(OrderStatusActionCreators.setOrderStatusDeleteError(''));
      dispatch(OrderStatusActionCreators.setOrderStatusDeleteIsLoading(true));
      dispatch(OrderStatusActionCreators.setOrderStatusIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_ORDER_STATUS_API}/${id}`, tokenBearer);
      dispatch(OrderStatusActionCreators.setOrderStatusIsDelete(true));
      dispatch(OrderStatusActionCreators.setOrderStatusDeleteIsLoading(false));
    } catch (e) {
      dispatch(OrderStatusActionCreators.setOrderStatusIsDelete(false));
      dispatch(
        OrderStatusActionCreators.setOrderStatusDeleteError(
          'Произошла ошибка при удалении статуса заказа'
        )
      );
    }
  },
  cleanOrderStatusId: () => async (dispatch: AppDispatch) => {
    dispatch(OrderStatusActionCreators.getOrderStatusId({} as IOrderStatus));
  },
};
