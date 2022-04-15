import { IOrder } from 'models/IOrder';

export interface OrderState {
  order: IOrder;
  orderId: string;
  orderIsLoading: boolean;
  orderError: string;
}

export enum OrderActionEnum {
  GET_ORDER = 'GET_ORDER',
  SET_ORDER_ID = 'SET_ORDER_ID',
  SET_ORDER_ERROR = 'SET_ORDER_ERROR',
  SET_ORDER_IS_LOADING = 'SET_ORDER_IS_LOADING',
}

export interface GetOrder {
  type: OrderActionEnum.GET_ORDER;
  payload: IOrder;
}

export interface SetOrderId {
  type: OrderActionEnum.SET_ORDER_ID;
  payload: string;
}

export interface SetOrderErrorAction {
  type: OrderActionEnum.SET_ORDER_ERROR;
  payload: string;
}

export interface SetOrderIsLoadingAction {
  type: OrderActionEnum.SET_ORDER_IS_LOADING;
  payload: boolean;
}

export type OrderAction = GetOrder | SetOrderId | SetOrderErrorAction | SetOrderIsLoadingAction;
