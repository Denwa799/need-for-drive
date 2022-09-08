import { AppDispatch } from 'store/index';
import { ICategory, ICategoryCreate } from 'models/ICategory';
import { DeleteService, GetService, PostService, PutService } from 'api';
import {
  CategoriesActionEnum,
  GetCategories,
  GetCategory,
  SetCategoriesErrorAction,
  SetCategoriesIsLoadingAction,
  SetCategoryCreateErrorAction,
  SetCategoryCreateIsLoadingAction,
  SetCategoryDeleteErrorAction,
  SetCategoryDeleteIsLoadingAction,
  SetCategoryErrorAction,
  SetCategoryIsLoadingAction,
  SetCategoryIsCreateAction,
  SetCategoryIsDeleteAction,
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
  getCategory: (payload: ICategory): GetCategory => ({
    type: CategoriesActionEnum.GET_CATEGORY,
    payload,
  }),
  setCategoryIsLoading: (payload: boolean): SetCategoryIsLoadingAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_IS_LOADING,
    payload,
  }),
  setCategoryError: (payload: string): SetCategoryErrorAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_ERROR,
    payload,
  }),
  setCategoryIsCreate: (payload: boolean): SetCategoryIsCreateAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_IS_CREATE,
    payload,
  }),
  setCategoryCreateIsLoading: (payload: boolean): SetCategoryCreateIsLoadingAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_CREATE_IS_LOADING,
    payload,
  }),
  setCategoryCreateError: (payload: string): SetCategoryCreateErrorAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_CREATE_ERROR,
    payload,
  }),
  setCategoryIsDelete: (payload: boolean): SetCategoryIsDeleteAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_IS_DELETE,
    payload,
  }),
  setCategoryDeleteIsLoading: (payload: boolean): SetCategoryDeleteIsLoadingAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_DELETE_IS_LOADING,
    payload,
  }),
  setCategoryDeleteError: (payload: string): SetCategoryDeleteErrorAction => ({
    type: CategoriesActionEnum.SET_CATEGORY_DELETE_ERROR,
    payload,
  }),
  fetchCategories: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setCategoriesError(''));
      dispatch(CategoriesActionCreators.setCategoriesIsLoading(true));
      const response = await GetService(process.env.REACT_APP_CATEGORY_API);
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
  fetchCategory: (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setCategoryError(''));
      dispatch(CategoriesActionCreators.setCategoryIsLoading(true));
      const response = await GetService(`${process.env.REACT_APP_CATEGORY_API}/${id}`);
      dispatch(CategoriesActionCreators.getCategory(response.data.data));
      dispatch(CategoriesActionCreators.setCategoryIsLoading(false));
    } catch (e) {
      dispatch(
        CategoriesActionCreators.setCategoryError('Произошла ошибка при загрузке категории машины')
      );
    }
  },
  createCategory: (data: ICategoryCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setCategoryCreateError(''));
      dispatch(CategoriesActionCreators.setCategoryCreateIsLoading(true));
      dispatch(CategoriesActionCreators.setCategoryIsCreate(false));
      await PostService(process.env.REACT_APP_CATEGORY_API, data, tokenBearer);
      dispatch(CategoriesActionCreators.setCategoryIsCreate(true));
      dispatch(CategoriesActionCreators.setCategoryCreateIsLoading(false));
    } catch (e) {
      dispatch(CategoriesActionCreators.setCategoryIsCreate(false));
      dispatch(
        CategoriesActionCreators.setCategoryCreateError(
          'Произошла ошибка при создании категории машины'
        )
      );
    }
  },
  updateCategory:
    (id: number, data: ICategoryCreate, tokenBearer: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(CategoriesActionCreators.setCategoryCreateError(''));
        dispatch(CategoriesActionCreators.setCategoryCreateIsLoading(true));
        dispatch(CategoriesActionCreators.setCategoryIsCreate(false));
        await PutService(`${process.env.REACT_APP_CATEGORY_API}/${id}`, data, tokenBearer);
        dispatch(CategoriesActionCreators.setCategoryIsCreate(true));
        dispatch(CategoriesActionCreators.setCategoryCreateIsLoading(false));
      } catch (e) {
        dispatch(CategoriesActionCreators.setCategoryIsCreate(false));
        dispatch(
          CategoriesActionCreators.setCategoryCreateError(
            'Произошла ошибка при обновлении категории машины'
          )
        );
      }
    },
  deleteCategory: (id: number, tokenBearer: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoriesActionCreators.setCategoryDeleteError(''));
      dispatch(CategoriesActionCreators.setCategoryDeleteIsLoading(true));
      dispatch(CategoriesActionCreators.setCategoryIsDelete(false));
      await DeleteService(`${process.env.REACT_APP_CATEGORY_API}/${id}`, tokenBearer);
      dispatch(CategoriesActionCreators.setCategoryIsDelete(true));
      dispatch(CategoriesActionCreators.setCategoryDeleteIsLoading(false));
    } catch (e) {
      dispatch(CategoriesActionCreators.setCategoryIsDelete(false));
      dispatch(
        CategoriesActionCreators.setCategoryDeleteError(
          'Произошла ошибка при удалении категории машины'
        )
      );
    }
  },
  cleanCategory: () => async (dispatch: AppDispatch) => {
    dispatch(CategoriesActionCreators.getCategory({} as ICategory));
  },
};
