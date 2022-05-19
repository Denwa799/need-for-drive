import { IMapPoint } from 'models/IMapPoint';
import { MapPointsAction, MapPointsActionEnum, MapPointsState } from './types';

const initialState: MapPointsState = {
  points: [],
  mapPointsError: '',
  mapPointsIsLoading: false,
  pointId: {} as IMapPoint,
  pointIdIsLoading: false,
  pointIdError: '',
  pointIsCreate: false,
  pointCreateIsLoading: false,
  pointCreateError: '',
  pointIsDelete: false,
  pointDeleteIsLoading: false,
  pointDeleteError: '',
};

export default function MapPointsReducer(
  state = initialState,
  action: MapPointsAction
): MapPointsState {
  switch (action.type) {
    case MapPointsActionEnum.GET_POINTS:
      return { ...state, points: action.payload, mapPointsIsLoading: false };

    case MapPointsActionEnum.SET_POINTS_IS_LOADING:
      return { ...state, mapPointsIsLoading: action.payload };

    case MapPointsActionEnum.SET_POINTS_ERROR:
      return { ...state, mapPointsError: action.payload, mapPointsIsLoading: false };

    case MapPointsActionEnum.GET_POINT_ID:
      return { ...state, pointId: action.payload, pointIdIsLoading: false };

    case MapPointsActionEnum.SET_POINT_ID_IS_LOADING:
      return { ...state, pointIdIsLoading: action.payload };

    case MapPointsActionEnum.SET_POINT_ID_ERROR:
      return { ...state, pointIdError: action.payload, pointIdIsLoading: false };

    case MapPointsActionEnum.SET_POINT_IS_CREATE:
      return { ...state, pointIsCreate: action.payload };

    case MapPointsActionEnum.SET_POINT_CREATE_IS_LOADING:
      return { ...state, pointCreateIsLoading: action.payload };

    case MapPointsActionEnum.SET_POINT_CREATE_ERROR:
      return { ...state, pointCreateError: action.payload, pointCreateIsLoading: false };

    case MapPointsActionEnum.SET_POINT_IS_DELETE:
      return { ...state, pointIsDelete: action.payload };

    case MapPointsActionEnum.SET_POINT_DELETE_IS_LOADING:
      return { ...state, pointDeleteIsLoading: action.payload };

    case MapPointsActionEnum.SET_POINT_DELETE_ERROR:
      return { ...state, pointDeleteError: action.payload, pointDeleteIsLoading: false };

    default:
      return state;
  }
}
