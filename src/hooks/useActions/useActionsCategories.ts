import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoriesActionCreators } from 'store/reducers/categories/action-creators';

export const useActionsCategories = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CategoriesActionCreators, dispatch);
};
