import { IMapPoint } from '../../../models/IMapPoint';

export interface MapPointsState {
  points: IMapPoint[];
}

export enum MapPointsActionEnum {
  GET_POINTS = 'GET_POINTS',
}

export interface GetMapPoints {
  type: MapPointsActionEnum.GET_POINTS;
  payload: IMapPoint[];
}

export type MapPointsAction = GetMapPoints;
