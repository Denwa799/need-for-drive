import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CityLocationActionCreators } from '../../store/reducers/city-location/action-creators';

export const useActionsCityLocation = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CityLocationActionCreators, dispatch);
};
