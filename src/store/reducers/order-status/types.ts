import { IOrderStatus } from 'models/IOrderStatus';

export interface OrderStatusState {
  allOrderStatus: IOrderStatus[];
  orderStatusIsLoading: boolean;
  orderStatusError: string;
}

export enum OrderStatusActionEnum {
  GET_ALL_ORDER_STATUS = 'GET_ALL_ORDER_STATUS',
  SET_ORDER_STATUS_ERROR = 'SET_ORDER_STATUS_ERROR',
  SET_ORDER_STATUS_IS_LOADING = 'SET_ORDER_STATUS_IS_LOADING',
}

export interface GetAllOrderStatus {
  type: OrderStatusActionEnum.GET_ALL_ORDER_STATUS;
  payload: IOrderStatus[];
}

export interface SetOrderStatusErrorAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_ERROR;
  payload: string;
}

export interface SetOrderStatusIsLoadingAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_IS_LOADING;
  payload: boolean;
}

export type OrderStatusAction =
  | GetAllOrderStatus
  | SetOrderStatusErrorAction
  | SetOrderStatusIsLoadingAction;
