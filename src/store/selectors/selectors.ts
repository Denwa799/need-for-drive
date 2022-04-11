import { RootState } from '../index';

export const mapPointsSelector = (state: RootState) => state.mapPoints;
export const cityLocationSelector = (state: RootState) => state.cityLocation;
export const carsSelector = (state: RootState) => state.cars;
export const categoriesSelector = (state: RootState) => state.categories;
