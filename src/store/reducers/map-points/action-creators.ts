import { IMapPoint, IMapPointCreate } from 'models/IMapPoint';
import { AppDispatch } from 'store/index';
import { DeleteService, GetService, PostService, PutService } from 'api';
import {
  GetMapPoints,
  GetPointId,
  MapPointsActionEnum,
  SetMapPointsErrorAction,
  SetMapPointsIsLoadingAction,
  SetPointCreateErrorAction,
  SetPointCreateIsLoadingAction,
  SetPointDeleteErrorAction,
  SetPointDeleteIsLoadingAction,
  SetPointIdErrorAction,
  SetPointIdIsLoadingAction,
  SetPointIsCreateAction,
  SetPointIsDeleteAction,
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
  getPointId: (payload: IMapPoint): GetPointId => ({
    type: MapPointsActionEnum.GET_POINT_ID,
    payload,
  }),
  setPointIdIsLoading: (payload: boolean): SetPointIdIsLoadingAction => ({
    type: MapPointsActionEnum.SET_POINT_ID_IS_LOADING,
    payload,
  }),
  setPointIdError: (payload: string): SetPointIdErrorAction => ({
    type: MapPointsActionEnum.SET_POINT_ID_ERROR,
    payload,
  }),
  setPointIsCreate: (payload: boolean): SetPointIsCreateAction => ({
    type: MapPointsActionEnum.SET_POINT_IS_CREATE,
    payload,
  }),
  setPointCreateIsLoading: (payload: boolean): SetPointCreateIsLoadingAction => ({
    type: MapPointsActionEnum.SET_POINT_CREATE_IS_LOADING,
    payload,
  }),
  setPointCreateError: (payload: string): SetPointCreateErrorAction => ({
    type: MapPointsActionEnum.SET_POINT_CREATE_ERROR,
    payload,
  }),
  setPointIsDelete: (payload: boolean): SetPointIsDeleteAction => ({
    type: MapPointsActionEnum.SET_POINT_IS_DELETE,
    payload,
  }),
  setPointDeleteIsLoading: (payload: boolean): SetPointDeleteIsLoadingAction => ({
    type: MapPointsActionEnum.SET_POINT_DELETE_IS_LOADING,
    payload,
  }),
  setPointDeleteError: (payload: string): SetPointDeleteErrorAction => ({
    type: MapPointsActionEnum.SET_POINT_DELETE_ERROR,
    payload,
  }),
  fetchPoints: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(MapPointsActionCreators.setMapPointsIsLoading(true));
      const response = await GetService(process.env.REACT_APP_MAP_POINTS_API);
      dispatch(MapPointsActionCreators.getMapPoints(response.data.data));
    } catch (e) {
      dispatch(
        MapPointsActionCreators.setMapPointsError('Произошла ошибка при загрузке списка городов')
      );
    }
  },
  fetchPointId: (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(MapPointsActionCreators.setPointIdError(''));
      dispatch(MapPointsActionCreators.setPointIdIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_MAP_POINTS_API}/${id}`);
      dispatch(MapPointsActionCreators.getPointId(response.data.data));
    } catch (e) {
      dispatch(
        MapPointsActionCreators.setPointIdError('Произошла ошибка при загрузке пункта выдачи')
      );
    }
  },
  createPoint: (data: IMapPointCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(MapPointsActionCreators.setPointCreateError(''));
      dispatch(MapPointsActionCreators.setPointCreateIsLoading(true));
      dispatch(MapPointsActionCreators.setPointIsCreate(false));
      await PostService(process.env.REACT_APP_MAP_POINTS_API, data, tokenBearer);
      dispatch(MapPointsActionCreators.setPointIsCreate(true));
      dispatch(MapPointsActionCreators.setPointCreateIsLoading(false));
    } catch (e) {
      dispatch(MapPointsActionCreators.setPointIsCreate(false));
      dispatch(
        MapPointsActionCreators.setPointCreateError('Произошла ошибка при создании пункта выдачи')
      );
    }
  },
  updatePoint:
    (id: string, data: IMapPointCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(MapPointsActionCreators.setPointCreateError(''));
        dispatch(MapPointsActionCreators.setPointCreateIsLoading(true));
        dispatch(MapPointsActionCreators.setPointIsCreate(false));
        await PutService(`${process.env.REACT_APP_MAP_POINTS_API}/${id}`, data, tokenBearer);
        dispatch(MapPointsActionCreators.setPointIsCreate(true));
        dispatch(MapPointsActionCreators.setPointCreateIsLoading(false));
      } catch (e) {
        dispatch(MapPointsActionCreators.setPointIsCreate(false));
        dispatch(
          MapPointsActionCreators.setPointCreateError(
            'Произошла ошибка при обновлении пункта выдачи'
          )
        );
      }
    },
  deletePoint: (id: string, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(MapPointsActionCreators.setPointDeleteError(''));
      dispatch(MapPointsActionCreators.setPointDeleteIsLoading(true));
      dispatch(MapPointsActionCreators.setPointIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_MAP_POINTS_API}/${id}`, tokenBearer);
      dispatch(MapPointsActionCreators.setPointIsDelete(true));
      dispatch(MapPointsActionCreators.setPointDeleteIsLoading(false));
    } catch (e) {
      dispatch(MapPointsActionCreators.setPointIsDelete(false));
      dispatch(
        MapPointsActionCreators.setPointDeleteError('Произошла ошибка при удалении пункта выдачи')
      );
    }
  },
  cleanPointId: () => async (dispatch: AppDispatch) => {
    dispatch(MapPointsActionCreators.getPointId({} as IMapPoint));
  },
};
