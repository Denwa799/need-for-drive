import { IMapPoint } from 'models/IMapPoint';
import { AppDispatch } from 'store/index';
import MapPointsService from 'api/MapPointsService';
import {
  GetMapPoints,
  MapPointsActionEnum,
  SetMapPointsErrorAction,
  SetMapPointsIsLoadingAction,
} from './types';

export const MapPointsActionCreators = {
  getMapPoints: (payload: IMapPoint[]): GetMapPoints => ({
    type: MapPointsActionEnum.GET_POINTS,
    payload,
  }),
  setMapPointsIsLoading: (payload: boolean): SetMapPointsIsLoadingAction => ({
    type: MapPointsActionEnum.SET_POINTS_IS_LOADING,
    payload,
  }),
  setMapPointsError: (payload: string): SetMapPointsErrorAction => ({
    type: MapPointsActionEnum.SET_POINTS_ERROR,
    payload,
  }),
  fetchPoints: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(MapPointsActionCreators.setMapPointsIsLoading(true));
      const response = await MapPointsService.getPoints();
      dispatch(MapPointsActionCreators.getMapPoints(response.data.data));
      dispatch(MapPointsActionCreators.setMapPointsIsLoading(false));
    } catch (e) {
      dispatch(MapPointsActionCreators.setMapPointsError('Произошла ошибка при загрузке данных'));
    }
  },
};
