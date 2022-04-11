import { IMapPoint } from 'models/IMapPoint';

export interface MapPointsState {
  points: IMapPoint[];
  mapPointsIsLoading: boolean;
  mapPointsError: string;
}

export enum MapPointsActionEnum {
  GET_POINTS = 'GET_POINTS',
  SET_POINTS_ERROR = 'SET_POINTS_ERROR',
  SET_POINTS_IS_LOADING = 'SET_POINTS_IS_LOADING',
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

export type MapPointsAction = GetMapPoints | SetMapPointsIsLoadingAction | SetMapPointsErrorAction;
