import { CarsActionCreators } from './cars/action-creators';
import { CategoriesActionCreators } from './categories/action-creators';
import { CityLocationActionCreators } from './city-location/action-creators';
import { MapPointsActionCreators } from './map-points/action-creators';
import { OrderActionCreators } from './order/action-creators';

export const allActionCreators = {
  ...CarsActionCreators,
  ...CategoriesActionCreators,
  ...CityLocationActionCreators,
  ...MapPointsActionCreators,
  ...OrderActionCreators,
};
