import { IPoint } from 'models/IPoint';

export interface PointsState {
  points: IPoint[];
  pointsIsLoading: boolean;
  pointsError: string;
  point: IPoint;
  pointIsLoading: boolean;
  pointError: string;
  pointIsCreate: boolean;
  pointCreateIsLoading: boolean;
  pointCreateError: string;
  pointIsDelete: boolean;
  pointDeleteIsLoading: boolean;
  pointDeleteError: string;
}

export enum PointsActionEnum {
  GET_POINTS = 'GET_POINTS',
  SET_POINTS_IS_LOADING = 'SET_POINTS_IS_LOADING',
  SET_POINTS_ERROR = 'SET_POINTS_ERROR',
  GET_POINT = 'GET_POINT',
  SET_POINT_IS_LOADING = 'SET_POINT_IS_LOADING',
  SET_POINT_ERROR = 'SET_POINT_ERROR',
  SET_POINT_IS_CREATE = 'SET_POINT_IS_CREATE',
  SET_POINT_CREATE_IS_LOADING = 'SET_POINT_CREATE_IS_LOADING',
  SET_POINT_CREATE_ERROR = 'SET_POINT_CREATE_ERROR',
  SET_POINT_IS_DELETE = 'SET_POINT_IS_DELETE',
  SET_POINT_DELETE_IS_LOADING = 'SET_POINT_DELETE_IS_LOADING',
  SET_POINT_DELETE_ERROR = 'SET_POINT_DELETE_ERROR',
}

export interface GetPoints {
  type: PointsActionEnum.GET_POINTS;
  payload: IPoint[];
}

export interface SetPointsIsLoadingAction {
  type: PointsActionEnum.SET_POINTS_IS_LOADING;
  payload: boolean;
}

export interface SetPointsErrorAction {
  type: PointsActionEnum.SET_POINTS_ERROR;
  payload: string;
}

export interface GetPoint {
  type: PointsActionEnum.GET_POINT;
  payload: IPoint;
}

export interface SetPointIsLoadingAction {
  type: PointsActionEnum.SET_POINT_IS_LOADING;
  payload: boolean;
}

export interface SetPointErrorAction {
  type: PointsActionEnum.SET_POINT_ERROR;
  payload: string;
}

export interface SetPointIsCreateAction {
  type: PointsActionEnum.SET_POINT_IS_CREATE;
  payload: boolean;
}

export interface SetPointCreateIsLoadingAction {
  type: PointsActionEnum.SET_POINT_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetPointCreateErrorAction {
  type: PointsActionEnum.SET_POINT_CREATE_ERROR;
  payload: string;
}

export interface SetPointIsDeleteAction {
  type: PointsActionEnum.SET_POINT_IS_DELETE;
  payload: boolean;
}

export interface SetPointDeleteIsLoadingAction {
  type: PointsActionEnum.SET_POINT_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetPointDeleteErrorAction {
  type: PointsActionEnum.SET_POINT_DELETE_ERROR;
  payload: string;
}

export type PointsAction =
  | GetPoints
  | SetPointsIsLoadingAction
  | SetPointsErrorAction
  | GetPoint
  | SetPointIsLoadingAction
  | SetPointErrorAction
  | SetPointIsCreateAction
  | SetPointCreateIsLoadingAction
  | SetPointCreateErrorAction
  | SetPointIsDeleteAction
  | SetPointDeleteIsLoadingAction
  | SetPointDeleteErrorAction;
