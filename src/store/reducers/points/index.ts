import { IPoint } from 'models/IPoint';
import { PointsAction, PointsActionEnum, PointsState } from './types';

const initialState: PointsState = {
  points: [],
  pointsIsLoading: false,
  pointsError: '',
  point: {} as IPoint,
  pointIsLoading: false,
  pointError: '',
  pointIsCreate: false,
  pointCreateIsLoading: false,
  pointCreateError: '',
  pointIsDelete: false,
  pointDeleteIsLoading: false,
  pointDeleteError: '',
};

export default function PointsReducer(state = initialState, action: PointsAction): PointsState {
  switch (action.type) {
    case PointsActionEnum.GET_POINTS:
      return { ...state, points: action.payload, pointsIsLoading: false };

    case PointsActionEnum.SET_POINTS_IS_LOADING:
      return { ...state, pointsIsLoading: action.payload };

    case PointsActionEnum.SET_POINTS_ERROR:
      return { ...state, pointsError: action.payload, pointsIsLoading: false };

    case PointsActionEnum.GET_POINT:
      return { ...state, point: action.payload, pointIsLoading: false };

    case PointsActionEnum.SET_POINT_IS_LOADING:
      return { ...state, pointIsLoading: action.payload };

    case PointsActionEnum.SET_POINT_ERROR:
      return { ...state, pointError: action.payload, pointIsLoading: false };

    case PointsActionEnum.SET_POINT_IS_CREATE:
      return { ...state, pointIsCreate: action.payload };

    case PointsActionEnum.SET_POINT_CREATE_IS_LOADING:
      return { ...state, pointCreateIsLoading: action.payload };

    case PointsActionEnum.SET_POINT_CREATE_ERROR:
      return { ...state, pointCreateError: action.payload, pointCreateIsLoading: false };

    case PointsActionEnum.SET_POINT_IS_DELETE:
      return { ...state, pointIsDelete: action.payload };

    case PointsActionEnum.SET_POINT_DELETE_IS_LOADING:
      return { ...state, pointDeleteIsLoading: action.payload };

    case PointsActionEnum.SET_POINT_DELETE_ERROR:
      return { ...state, pointDeleteError: action.payload, pointDeleteIsLoading: false };

    default:
      return state;
  }
}
