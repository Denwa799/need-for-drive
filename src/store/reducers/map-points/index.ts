import { MapPointsAction, MapPointsActionEnum, MapPointsState } from './types';

const initialState: MapPointsState = {
  points: [],
  mapPointsError: '',
  mapPointsIsLoading: true,
};

export default function MapPointsReducer(
  state = initialState,
  action: MapPointsAction
): MapPointsState {
  switch (action.type) {
    case MapPointsActionEnum.GET_POINTS:
      return { ...state, points: action.payload, mapPointsIsLoading: false };

    case MapPointsActionEnum.SET_IS_LOADING:
      return { ...state, mapPointsIsLoading: action.payload };

    case MapPointsActionEnum.SET_ERROR:
      return { ...state, mapPointsError: action.payload, mapPointsIsLoading: false };

    default:
      return state;
  }
}
