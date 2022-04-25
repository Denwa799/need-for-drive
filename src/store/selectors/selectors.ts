import { RootState } from '../index';

export const mapPointsSelector = (state: RootState) => state.mapPoints;
export const cityLocationSelector = (state: RootState) => state.cityLocation;
export const carsSelector = (state: RootState) => state.cars;
export const categoriesSelector = (state: RootState) => state.categories;
export const authSelector = (state: RootState) => state.auth;
export const orderSelector = (state: RootState) => state.order;
export const languageSelector = (state: RootState) => state.language;
export const ratesSelector = (state: RootState) => state.rates;
