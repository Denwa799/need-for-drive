import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapPointsActionCreators } from 'store/reducers/map-points/action-creators';

export const useActionsMapPoints = () => {
  const dispatch = useDispatch();
  return bindActionCreators(MapPointsActionCreators, dispatch);
};
