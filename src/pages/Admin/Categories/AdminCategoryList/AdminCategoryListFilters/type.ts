import { ICategory } from 'models/ICategory';

export interface IAdminCategoryListFilters {
  setCurrentPage: (value: number) => void;
  setFilteredCategories: (value: ICategory[]) => void;
}
