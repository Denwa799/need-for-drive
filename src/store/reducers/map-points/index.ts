import { MapPointsAction, MapPointsActionEnum, MapPointsState } from './types';

const initialState: MapPointsState = {
  points: [],
};

export default function MapPointsReducer(
  state = initialState,
  action: MapPointsAction
): MapPointsState {
  switch (action.type) {
    case MapPointsActionEnum.GET_POINTS:
      return { ...state, points: action.payload };

    default:
      return state;
  }
}
