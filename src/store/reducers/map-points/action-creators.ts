import { IMapPoint } from '../../../models/IMapPoint';
import { GetMapPoints, MapPointsActionEnum, SetErrorAction, SetIsLoadingAction } from './types';
import { AppDispatch } from '../../index';
import MapPointsService from '../../../api/MapPointsService';

export const MapPointsActionCreators = {
  getMapPoints: (payload: IMapPoint[]): GetMapPoints => ({
    type: MapPointsActionEnum.GET_POINTS,
    payload,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: MapPointsActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: MapPointsActionEnum.SET_ERROR,
    payload,
  }),
  fetchPoints: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(MapPointsActionCreators.setIsLoading(true));
      const response = await MapPointsService.getPoints();
      dispatch(MapPointsActionCreators.getMapPoints(response.data.data));
      dispatch(MapPointsActionCreators.setIsLoading(false));
    } catch (e) {
      dispatch(MapPointsActionCreators.setError('Произошла ошибка при загрузке данных'));
    }
  },
};
