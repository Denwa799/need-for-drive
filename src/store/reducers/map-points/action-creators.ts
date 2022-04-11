import { IMapPoint } from 'models/IMapPoint';
import { AppDispatch } from 'store/index';
import {
  GetMapPoints,
  MapPointsActionEnum,
  SetMapPointsErrorAction,
  SetMapPointsIsLoadingAction,
} from './types';
import { GetService } from '../../../api';

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
      const response = await GetService(process.env.REACT_APP_MAP_POINTS_API);
      dispatch(MapPointsActionCreators.getMapPoints(response.data.data));
      dispatch(MapPointsActionCreators.setMapPointsIsLoading(false));
    } catch (e) {
      dispatch(
        MapPointsActionCreators.setMapPointsError('Произошла ошибка при загрузке списка городов')
      );
    }
  },
};
