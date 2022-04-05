import { CategoriesAction, CategoriesActionEnum, CategoriesState } from './types';

const initialState: CategoriesState = {
  categories: [],
  categoriesError: '',
  categoriesIsLoading: true,
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

    default:
      return state;
  }
}
