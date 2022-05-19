import { ICategory } from 'models/ICategory';

export interface CategoriesState {
  categories: ICategory[];
  categoriesIsLoading: boolean;
  categoriesError: string;
  categoryId: ICategory;
  categoryIdIsLoading: boolean;
  categoryIdError: string;
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
  GET_CATEGORY_ID = 'GET_CATEGORY_ID',
  SET_CATEGORY_ID_IS_LOADING = 'SET_CATEGORY_ID_IS_LOADING',
  SET_CATEGORY_ID_ERROR = 'SET_CATEGORY_ID_ERROR',
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

export interface GetCategoryId {
  type: CategoriesActionEnum.GET_CATEGORY_ID;
  payload: ICategory;
}

export interface SetCategoryIdIsLoadingAction {
  type: CategoriesActionEnum.SET_CATEGORY_ID_IS_LOADING;
  payload: boolean;
}

export interface SetCategoryIdErrorAction {
  type: CategoriesActionEnum.SET_CATEGORY_ID_ERROR;
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
  | GetCategoryId
  | SetCategoryIdIsLoadingAction
  | SetCategoryIdErrorAction
  | SetCategoryIsCreateAction
  | SetCategoryCreateIsLoadingAction
  | SetCategoryCreateErrorAction
  | SetCategoryIsDeleteAction
  | SetCategoryDeleteIsLoadingAction
  | SetCategoryDeleteErrorAction;
