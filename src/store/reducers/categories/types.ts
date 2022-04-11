import { ICategory } from 'models/ICategory';

export interface CategoriesState {
  categories: ICategory[];
  categoriesIsLoading: boolean;
  categoriesError: string;
}

export enum CategoriesActionEnum {
  GET_CATEGORIES = 'GET_CATEGORIES',
  SET_CATEGORIES_ERROR = 'SET_CATEGORIES_ERROR',
  SET_CATEGORIES_IS_LOADING = 'SET_CATEGORIES_IS_LOADING',
}

export interface GetCategories {
  type: CategoriesActionEnum.GET_CATEGORIES;
  payload: ICategory[];
}

export interface SetCategoriesErrorAction {
  type: CategoriesActionEnum.SET_CATEGORIES_ERROR;
  payload: string;
}

export interface SetCategoriesIsLoadingAction {
  type: CategoriesActionEnum.SET_CATEGORIES_IS_LOADING;
  payload: boolean;
}

export type CategoriesAction =
  | GetCategories
  | SetCategoriesErrorAction
  | SetCategoriesIsLoadingAction;
