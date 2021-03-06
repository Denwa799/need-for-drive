import { IOrderStatus } from 'models/IOrderStatus';

export interface OrderStatusState {
  allOrderStatus: IOrderStatus[];
  allOrderStatusIsLoading: boolean;
  allOrderStatusError: string;
  orderStatus: IOrderStatus;
  orderStatusIsLoading: boolean;
  orderStatusError: string;
  orderStatusIsCreate: boolean;
  orderStatusCreateIsLoading: boolean;
  orderStatusCreateError: string;
  orderStatusIsDelete: boolean;
  orderStatusDeleteIsLoading: boolean;
  orderStatusDeleteError: string;
}

export enum OrderStatusActionEnum {
  GET_ALL_ORDER_STATUS = 'GET_ALL_ORDER_STATUS',
  SET_ALL_ORDER_STATUS_ERROR = 'SET_ALL_ORDER_STATUS_ERROR',
  SET_ALL_ORDER_STATUS_IS_LOADING = 'SET_ALL_ORDER_STATUS_IS_LOADING',
  GET_ORDER_STATUS = 'GET_ORDER_STATUS',
  SET_ORDER_STATUS_IS_LOADING = 'SET_ORDER_STATUS_IS_LOADING',
  SET_ORDER_STATUS_ERROR = 'SET_ORDER_STATUS_ERROR',
  SET_ORDER_STATUS_IS_CREATE = 'SET_ORDER_STATUS_IS_CREATE',
  SET_ORDER_STATUS_CREATE_IS_LOADING = 'SET_ORDER_STATUS_CREATE_IS_LOADING',
  SET_ORDER_STATUS_CREATE_ERROR = 'SET_ORDER_STATUS_CREATE_ERROR',
  SET_ORDER_STATUS_IS_DELETE = 'SET_ORDER_STATUS_IS_DELETE',
  SET_ORDER_STATUS_DELETE_IS_LOADING = 'SET_ORDER_STATUS_DELETE_IS_LOADING',
  SET_ORDER_STATUS_DELETE_ERROR = 'SET_ORDER_STATUS_DELETE_ERROR',
}

export interface GetAllOrderStatus {
  type: OrderStatusActionEnum.GET_ALL_ORDER_STATUS;
  payload: IOrderStatus[];
}

export interface SetAllOrderStatusErrorAction {
  type: OrderStatusActionEnum.SET_ALL_ORDER_STATUS_ERROR;
  payload: string;
}

export interface SetAllOrderStatusIsLoadingAction {
  type: OrderStatusActionEnum.SET_ALL_ORDER_STATUS_IS_LOADING;
  payload: boolean;
}

export interface GetOrderStatus {
  type: OrderStatusActionEnum.GET_ORDER_STATUS;
  payload: IOrderStatus;
}

export interface SetOrderStatusIsLoadingAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_IS_LOADING;
  payload: boolean;
}

export interface SetOrderStatusErrorAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_ERROR;
  payload: string;
}

export interface SetOrderStatusIsCreateAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_IS_CREATE;
  payload: boolean;
}

export interface SetOrderStatusCreateIsLoadingAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetOrderStatusCreateErrorAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_CREATE_ERROR;
  payload: string;
}

export interface SetOrderStatusIsDeleteAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_IS_DELETE;
  payload: boolean;
}

export interface SetOrderStatusDeleteIsLoadingAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetOrderStatusDeleteErrorAction {
  type: OrderStatusActionEnum.SET_ORDER_STATUS_DELETE_ERROR;
  payload: string;
}

export type OrderStatusAction =
  | GetAllOrderStatus
  | SetAllOrderStatusErrorAction
  | SetAllOrderStatusIsLoadingAction
  | GetOrderStatus
  | SetOrderStatusIsLoadingAction
  | SetOrderStatusErrorAction
  | SetOrderStatusIsCreateAction
  | SetOrderStatusCreateIsLoadingAction
  | SetOrderStatusCreateErrorAction
  | SetOrderStatusIsDeleteAction
  | SetOrderStatusDeleteIsLoadingAction
  | SetOrderStatusDeleteErrorAction;
