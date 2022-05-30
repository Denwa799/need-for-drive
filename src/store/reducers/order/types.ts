import { IOrder } from 'models/IOrder';

export interface OrderState {
  orders: IOrder[];
  ordersIsLoading: boolean;
  ordersError: string;
  ordersCount: number;
  order: IOrder;
  orderId: string;
  orderIsLoading: boolean;
  orderError: string;
  orderIsCreate: boolean;
  orderCreateIsLoading: boolean;
  orderCreateError: string;
  orderIsDelete: boolean;
  orderDeleteIsLoading: boolean;
  orderDeleteError: string;
}

export enum OrderActionEnum {
  GET_ALL_ORDERS = 'GET_ALL_ORDERS',
  SET_ORDERS_ERROR = 'SET_ORDERS_ERROR',
  SET_ORDERS_IS_LOADING = 'SET_ORDERS_IS_LOADING',
  GET_ORDERS_COUNT = 'GET_ORDERS_COUNT',
  GET_ORDER = 'GET_ORDER',
  SET_ORDER_ID = 'SET_ORDER_ID',
  SET_ORDER_IS_LOADING = 'SET_ORDER_IS_LOADING',
  SET_ORDER_ERROR = 'SET_ORDER_ERROR',
  SET_ORDER_IS_CREATE = 'SET_ORDER_IS_CREATE',
  SET_ORDER_CREATE_IS_LOADING = 'SET_ORDER_CREATE_IS_LOADING',
  SET_ORDER_CREATE_ERROR = 'SET_ORDER_CREATE_ERROR',
  SET_ORDER_IS_DELETE = 'SET_ORDER_IS_DELETE',
  SET_ORDER_DELETE_IS_LOADING = 'SET_ORDER_DELETE_IS_LOADING',
  SET_ORDER_DELETE_ERROR = 'SET_ORDER_DELETE_ERROR',
}

export interface GetAllOrders {
  type: OrderActionEnum.GET_ALL_ORDERS;
  payload: IOrder[];
}

export interface GetOrdersCount {
  type: OrderActionEnum.GET_ORDERS_COUNT;
  payload: number;
}

export interface SetOrdersErrorAction {
  type: OrderActionEnum.SET_ORDERS_ERROR;
  payload: string;
}

export interface SetOrdersIsLoadingAction {
  type: OrderActionEnum.SET_ORDERS_IS_LOADING;
  payload: boolean;
}

export interface GetOrder {
  type: OrderActionEnum.GET_ORDER;
  payload: IOrder;
}

export interface SetOrderId {
  type: OrderActionEnum.SET_ORDER_ID;
  payload: string;
}

export interface SetOrderIsLoadingAction {
  type: OrderActionEnum.SET_ORDER_IS_LOADING;
  payload: boolean;
}

export interface SetOrderErrorAction {
  type: OrderActionEnum.SET_ORDER_ERROR;
  payload: string;
}

export interface SetOrderIsCreateAction {
  type: OrderActionEnum.SET_ORDER_IS_CREATE;
  payload: boolean;
}

export interface SetOrderCreateIsLoadingAction {
  type: OrderActionEnum.SET_ORDER_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetOrderCreateErrorAction {
  type: OrderActionEnum.SET_ORDER_CREATE_ERROR;
  payload: string;
}

export interface SetOrderIsDeleteAction {
  type: OrderActionEnum.SET_ORDER_IS_DELETE;
  payload: boolean;
}

export interface SetOrderDeleteIsLoadingAction {
  type: OrderActionEnum.SET_ORDER_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetOrderDeleteErrorAction {
  type: OrderActionEnum.SET_ORDER_DELETE_ERROR;
  payload: string;
}

export type OrderAction =
  | GetAllOrders
  | GetOrdersCount
  | GetOrder
  | SetOrderId
  | SetOrdersErrorAction
  | SetOrdersIsLoadingAction
  | SetOrderIsLoadingAction
  | SetOrderErrorAction
  | SetOrderIsCreateAction
  | SetOrderCreateIsLoadingAction
  | SetOrderCreateErrorAction
  | SetOrderIsDeleteAction
  | SetOrderDeleteIsLoadingAction
  | SetOrderDeleteErrorAction;
