import { IMapPoint } from 'models/IMapPoint';

export interface MapPointsState {
  points: IMapPoint[];
  mapPointsIsLoading: boolean;
  mapPointsError: string;
}

export enum MapPointsActionEnum {
  GET_POINTS = 'GET_POINTS',
  SET_ERROR = 'SET_ERROR',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export interface GetMapPoints {
  type: MapPointsActionEnum.GET_POINTS;
  payload: IMapPoint[];
}

export interface SetErrorAction {
  type: MapPointsActionEnum.SET_ERROR;
  payload: string;
}

export interface SetIsLoadingAction {
  type: MapPointsActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type MapPointsAction = GetMapPoints | SetIsLoadingAction | SetErrorAction;
