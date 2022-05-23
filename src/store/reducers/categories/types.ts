import { ICategory } from 'models/ICategory';

export interface CategoriesState {
  categories: ICategory[];
  categoriesIsLoading: boolean;
  categoriesError: string;
  category: ICategory;
  categoryIsLoading: boolean;
  categoryError: string;
  categoryIsCreate: boolean;
  categoryCreateIsLoading: boolean;
  categoryCreateError: string;
  categoryIsDelete: boolean;
  categoryDeleteIsLoading: boolean;
  categoryDeleteError: string;
}

export enum CategoriesActionEnum {
  GET_CATEGORIES = 'GET_CATEGORIES',
  SET_CATEGORIES_ERROR = 'SET_CATEGORIES_ERROR',
  SET_CATEGORIES_IS_LOADING = 'SET_CATEGORIES_IS_LOADING',
  GET_CATEGORY = 'GET_CATEGORY',
  SET_CATEGORY_IS_LOADING = 'SET_CATEGORY_IS_LOADING',
  SET_CATEGORY_ERROR = 'SET_CATEGORY_ERROR',
  SET_CATEGORY_IS_CREATE = 'SET_CATEGORY_IS_CREATE',
  SET_CATEGORY_CREATE_IS_LOADING = 'SET_CATEGORY_CREATE_IS_LOADING',
  SET_CATEGORY_CREATE_ERROR = 'SET_CATEGORY_CREATE_ERROR',
  SET_CATEGORY_IS_DELETE = 'SET_CATEGORY_IS_DELETE',
  SET_CATEGORY_DELETE_IS_LOADING = 'SET_CATEGORY_DELETE_IS_LOADING',
  SET_CATEGORY_DELETE_ERROR = 'SET_CATEGORY_DELETE_ERROR',
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

export interface GetCategory {
  type: CategoriesActionEnum.GET_CATEGORY;
  payload: ICategory;
}

export interface SetCategoryIsLoadingAction {
  type: CategoriesActionEnum.SET_CATEGORY_IS_LOADING;
  payload: boolean;
}

export interface SetCategoryErrorAction {
  type: CategoriesActionEnum.SET_CATEGORY_ERROR;
  payload: string;
}

export interface SetCategoryIsCreateAction {
  type: CategoriesActionEnum.SET_CATEGORY_IS_CREATE;
  payload: boolean;
}

export interface SetCategoryCreateIsLoadingAction {
  type: CategoriesActionEnum.SET_CATEGORY_CREATE_IS_LOADING;
  payload: boolean;
}

export interface SetCategoryCreateErrorAction {
  type: CategoriesActionEnum.SET_CATEGORY_CREATE_ERROR;
  payload: string;
}

export interface SetCategoryIsDeleteAction {
  type: CategoriesActionEnum.SET_CATEGORY_IS_DELETE;
  payload: boolean;
}

export interface SetCategoryDeleteIsLoadingAction {
  type: CategoriesActionEnum.SET_CATEGORY_DELETE_IS_LOADING;
  payload: boolean;
}

export interface SetCategoryDeleteErrorAction {
  type: CategoriesActionEnum.SET_CATEGORY_DELETE_ERROR;
  payload: string;
}

export type CategoriesAction =
  | GetCategories
  | SetCategoriesErrorAction
  | SetCategoriesIsLoadingAction
  | GetCategory
  | SetCategoryIsLoadingAction
  | SetCategoryErrorAction
  | SetCategoryIsCreateAction
  | SetCategoryCreateIsLoadingAction
  | SetCategoryCreateErrorAction
  | SetCategoryIsDeleteAction
  | SetCategoryDeleteIsLoadingAction
  | SetCategoryDeleteErrorAction;
