import { AppDispatch } from 'store/index';
import { ICategory } from 'models/ICategory';
import CategoriesService from 'api/CategoriesService';
import {
  CategoriesActionEnum,
  GetCategories,
  SetCategoriesErrorAction,
  SetCategoriesIsLoadingAction,
} from './types';

export const CategoriesActionCreators = {
  getCategories: (payload: ICategory[]): GetCategories => ({
    type: CategoriesActionEnum.GET_CATEGORIES,
    payload,
  }),
  setCategoriesIsLoading: (payload: boolean): SetCategoriesIsLoadingAction => ({
    type: CategoriesActionEnum.SET_CATEGORIES_IS_LOADING,
    payload,
  }),
  setCategoriesError: (payload: string): SetCategoriesErrorAction => ({
    type: CategoriesActionEnum.SET_CATEGORIES_ERROR,
    payload,
  }),
  fetchCategories: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setCategoriesIsLoading(true));
      const response = await CategoriesService.getCategories();
      dispatch(CategoriesActionCreators.getCategories(response.data.data));
      dispatch(CategoriesActionCreators.setCategoriesIsLoading(false));
    } catch (e) {
      dispatch(
        CategoriesActionCreators.setCategoriesError(
          'Произошла ошибка при загрузке списка категорий'
        )
      );
    }
  },
};
