import { ICategory } from 'models/ICategory';
import { CategoriesAction, CategoriesActionEnum, CategoriesState } from './types';

const initialState: CategoriesState = {
  categories: [],
  categoriesError: '',
  categoriesIsLoading: false,
  category: {} as ICategory,
  categoryIsLoading: false,
  categoryError: '',
  categoryIsCreate: false,
  categoryCreateIsLoading: false,
  categoryCreateError: '',
  categoryIsDelete: false,
  categoryDeleteIsLoading: false,
  categoryDeleteError: '',
};

export default function CategoriesReducer(
  state = initialState,
  action: CategoriesAction
): CategoriesState {
  switch (action.type) {
    case CategoriesActionEnum.GET_CATEGORIES:
      return { ...state, categories: action.payload, categoriesIsLoading: false };

    case CategoriesActionEnum.SET_CATEGORIES_IS_LOADING:
      return { ...state, categoriesIsLoading: action.payload };

    case CategoriesActionEnum.SET_CATEGORIES_ERROR:
      return { ...state, categoriesError: action.payload, categoriesIsLoading: false };

    case CategoriesActionEnum.GET_CATEGORY:
      return { ...state, category: action.payload, categoryIsLoading: false };

    case CategoriesActionEnum.SET_CATEGORY_IS_LOADING:
      return { ...state, categoryIsLoading: action.payload };

    case CategoriesActionEnum.SET_CATEGORY_ERROR:
      return { ...state, categoryError: action.payload, categoryIsLoading: false };

    case CategoriesActionEnum.SET_CATEGORY_IS_CREATE:
      return { ...state, categoryIsCreate: action.payload };

    case CategoriesActionEnum.SET_CATEGORY_CREATE_IS_LOADING:
      return { ...state, categoryCreateIsLoading: action.payload };

    case CategoriesActionEnum.SET_CATEGORY_CREATE_ERROR:
      return { ...state, categoryCreateError: action.payload, categoryCreateIsLoading: false };

    case CategoriesActionEnum.SET_CATEGORY_IS_DELETE:
      return { ...state, categoryIsDelete: action.payload };

    case CategoriesActionEnum.SET_CATEGORY_DELETE_IS_LOADING:
      return { ...state, categoryDeleteIsLoading: action.payload };

    case CategoriesActionEnum.SET_CATEGORY_DELETE_ERROR:
      return { ...state, categoryDeleteError: action.payload, categoryDeleteIsLoading: false };

    default:
      return state;
  }
}
