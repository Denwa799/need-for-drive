import { IMapPoint } from 'models/IMapPoint';

export interface MapPointsState {
  points: IMapPoint[];
  mapPointsIsLoading: boolean;
  mapPointsError: string;
  pointId: IMapPoint;
  pointIdIsLoading: boolean;
  pointIdError: string;
  pointIsCreate: boolean;
  pointCreateIsLoading: boolean;
  pointCreateError: string;
  pointIsDelete: boolean;
  pointDeleteIsLoading: boolean;
  pointDeleteError: string;
}

export enum MapPointsActionEnum {
  GET_POINTS = 'GET_POINTS',
  SET_POINTS_ERROR = 'SET_POINTS_ERROR',
  SET_POINTS_IS_LOADING = 'SET_POINTS_IS_LOADING',
  GET_POINT_ID = 'GET_POINT_ID',
  SET_POINT_ID_IS_LOADING = 'SET_POINT_ID_IS_LOADING',
  SET_POINT_ID_ERROR = 'SET_POINT_ID_ERROR',
  SET_POINT_IS_CREATE = 'SET_POINT_IS_CREATE',
  SET_POINT_CREATE_IS_LOADING = 'SET_POINT_CREATE_IS_LOADING',
  SET_POINT_CREATE_ERROR = 'SET_POINT_CREATE_ERROR',
  SET_POINT_IS_DELETE = 'SET_POINT_IS_DELETE',
  SET_POINT_DELETE_IS_LOADING = 'SET_POINT_DELETE_IS_LOADING',
  SET_POINT_DELETE_ERROR = 'SET_POINT_DELETE_ERROR',
}

export interface GetMapPoints {
  type: MapPointsActionEnum.GET_POINTS;
  payload: IMapPoint[];
}

export interface SetMapPointsErrorAction {
  type: MapPointsActionEnum.SET_POINTS_ERROR;
  payload: string;
}

export interface SetMapPointsIsLoadingAction {
  type: MapPointsActionEnum.SET_POINTS_IS_LOADING;
  payload: boolean;
}

export interface GetPointId {
  type: MapPointsActionEnum.GET_POINT_ID;
  payload: IMapPoint;
}

export interface SetPointIdIsLoadingAction {
  type: MapPointsActionEnum.SET_POINT_ID_IS_LOADING;
  payload: boolean;
}

export interface SetPointIdErrorAction {
  type: MapPointsActionEnum.SET_POINT_ID_ERROR;
  payload: string;
}

export interface SetPointIsCreateAction {
  type: MapPointsActionEnum.SET_POINT_IS_CREATE;
  payload: boolean;
}

export interface SetPointCreateIsLoadingAction {
  type: MapPointsActionEnum.SET_POINT_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetPointCreateErrorAction {
  type: MapPointsActionEnum.SET_POINT_CREATE_ERROR;
  payload: string;
}

export interface SetPointIsDeleteAction {
  type: MapPointsActionEnum.SET_POINT_IS_DELETE;
  payload: boolean;
}

export interface SetPointDeleteIsLoadingAction {
  type: MapPointsActionEnum.SET_POINT_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetPointDeleteErrorAction {
  type: MapPointsActionEnum.SET_POINT_DELETE_ERROR;
  payload: string;
}

export type MapPointsAction =
  | GetMapPoints
  | SetMapPointsIsLoadingAction
  | SetMapPointsErrorAction
  | GetPointId
  | SetPointIdIsLoadingAction
  | SetPointIdErrorAction
  | SetPointIsCreateAction
  | SetPointCreateIsLoadingAction
  | SetPointCreateErrorAction
  | SetPointIsDeleteAction
  | SetPointDeleteIsLoadingAction
  | SetPointDeleteErrorAction;
