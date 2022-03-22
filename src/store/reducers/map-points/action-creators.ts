import { IMapPoint } from '../../../models/IMapPoint';
import { GetMapPoints, MapPointsActionEnum } from './types';
import { AppDispatch } from '../../index';
import MapPointsService from '../../../api/MapPointsService';

export const MapPointsActionCreators = {
  getMapPoints: (payload: IMapPoint[]): GetMapPoints => ({
    type: MapPointsActionEnum.GET_POINTS,
    payload,
  }),
  fetchPoints: () => async (dispatch: AppDispatch) => {
    try {
      const response = await MapPointsService.getPoints();
      dispatch(MapPointsActionCreators.getMapPoints(response.data.data));
    } catch (e) {
      console.log(e);
    }
  },
};
