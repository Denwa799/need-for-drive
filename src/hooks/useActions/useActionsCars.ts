import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CarsActionCreators } from 'store/reducers/cars/action-creators';

export const useActionsCars = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CarsActionCreators, dispatch);
};
