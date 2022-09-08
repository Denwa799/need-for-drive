import { IPoint, IPointCreate } from 'models/IPoint';
import { AppDispatch } from 'store/index';
import { DeleteService, GetService, PostService, PutService } from 'api';
import {
  GetPoint,
  GetPoints,
  PointsActionEnum,
  SetPointCreateErrorAction,
  SetPointCreateIsLoadingAction,
  SetPointDeleteErrorAction,
  SetPointDeleteIsLoadingAction,
  SetPointErrorAction,
  SetPointIsCreateAction,
  SetPointIsDeleteAction,
  SetPointIsLoadingAction,
  SetPointsErrorAction,
  SetPointsIsLoadingAction,
} from './types';

export const PointsActionCreators = {
  getPoints: (payload: IPoint[]): GetPoints => ({
    type: PointsActionEnum.GET_POINTS,
    payload,
  }),
  setPointsIsLoading: (payload: boolean): SetPointsIsLoadingAction => ({
    type: PointsActionEnum.SET_POINTS_IS_LOADING,
    payload,
  }),
  setPointsError: (payload: string): SetPointsErrorAction => ({
    type: PointsActionEnum.SET_POINTS_ERROR,
    payload,
  }),
  getPoint: (payload: IPoint): GetPoint => ({
    type: PointsActionEnum.GET_POINT,
    payload,
  }),
  setPointIsLoading: (payload: boolean): SetPointIsLoadingAction => ({
    type: PointsActionEnum.SET_POINT_IS_LOADING,
    payload,
  }),
  setPointError: (payload: string): SetPointErrorAction => ({
    type: PointsActionEnum.SET_POINT_ERROR,
    payload,
  }),
  setPointIsCreate: (payload: boolean): SetPointIsCreateAction => ({
    type: PointsActionEnum.SET_POINT_IS_CREATE,
    payload,
  }),
  setPointCreateIsLoading: (payload: boolean): SetPointCreateIsLoadingAction => ({
    type: PointsActionEnum.SET_POINT_CREATE_IS_LOADING,
    payload,
  }),
  setPointCreateError: (payload: string): SetPointCreateErrorAction => ({
    type: PointsActionEnum.SET_POINT_CREATE_ERROR,
    payload,
  }),
  setPointIsDelete: (payload: boolean): SetPointIsDeleteAction => ({
    type: PointsActionEnum.SET_POINT_IS_DELETE,
    payload,
  }),
  setPointDeleteIsLoading: (payload: boolean): SetPointDeleteIsLoadingAction => ({
    type: PointsActionEnum.SET_POINT_DELETE_IS_LOADING,
    payload,
  }),
  setPointDeleteError: (payload: string): SetPointDeleteErrorAction => ({
    type: PointsActionEnum.SET_POINT_DELETE_ERROR,
    payload,
  }),
  fetchPoints: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(PointsActionCreators.setPointsError(''));
      dispatch(PointsActionCreators.setPointsIsLoading(true));
      const response = await GetService(process.env.REACT_APP_MAP_POINTS_API);
      dispatch(PointsActionCreators.getPoints(response.data.data));
    } catch (e) {
      dispatch(
        PointsActionCreators.setPointsError('Произошла ошибка при загрузке списка пунктов выдачи')
      );
    }
  },
  fetchPoint: (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PointsActionCreators.setPointError(''));
      dispatch(PointsActionCreators.setPointIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_MAP_POINTS_API}/${id}`);
      dispatch(PointsActionCreators.getPoint(response.data.data));
    } catch (e) {
      dispatch(PointsActionCreators.setPointError('Произошла ошибка при загрузке пункта выдачи'));
    }
  },
  createPoint: (data: IPointCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PointsActionCreators.setPointCreateError(''));
      dispatch(PointsActionCreators.setPointCreateIsLoading(true));
      dispatch(PointsActionCreators.setPointIsCreate(false));
      await PostService(process.env.REACT_APP_MAP_POINTS_API, data, tokenBearer);
      dispatch(PointsActionCreators.setPointIsCreate(true));
      dispatch(PointsActionCreators.setPointCreateIsLoading(false));
    } catch (e) {
      dispatch(PointsActionCreators.setPointIsCreate(false));
      dispatch(
        PointsActionCreators.setPointCreateError('Произошла ошибка при создании пункта выдачи')
      );
    }
  },
  updatePoint:
    (id: number, data: IPointCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(PointsActionCreators.setPointCreateError(''));
        dispatch(PointsActionCreators.setPointCreateIsLoading(true));
        dispatch(PointsActionCreators.setPointIsCreate(false));
        await PutService(`${process.env.REACT_APP_MAP_POINTS_API}/${id}`, data, tokenBearer);
        dispatch(PointsActionCreators.setPointIsCreate(true));
        dispatch(PointsActionCreators.setPointCreateIsLoading(false));
      } catch (e) {
        dispatch(PointsActionCreators.setPointIsCreate(false));
        dispatch(
          PointsActionCreators.setPointCreateError('Произошла ошибка при обновлении пункта выдачи')
        );
      }
    },
  deletePoint: (id: number, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PointsActionCreators.setPointDeleteError(''));
      dispatch(PointsActionCreators.setPointDeleteIsLoading(true));
      dispatch(PointsActionCreators.setPointIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_MAP_POINTS_API}/${id}`, tokenBearer);
      dispatch(PointsActionCreators.setPointIsDelete(true));
      dispatch(PointsActionCreators.setPointDeleteIsLoading(false));
    } catch (e) {
      dispatch(PointsActionCreators.setPointIsDelete(false));
      dispatch(
        PointsActionCreators.setPointDeleteError('Произошла ошибка при удалении пункта выдачи')
      );
    }
  },
  cleanPoint: () => async (dispatch: AppDispatch) => {
    dispatch(PointsActionCreators.getPoint({} as IPoint));
  },
};
