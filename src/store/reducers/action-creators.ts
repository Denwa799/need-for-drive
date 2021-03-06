import { CarsActionCreators } from './cars/action-creators';
import { CategoriesActionCreators } from './categories/action-creators';
import { CityLocationActionCreators } from './city-location/action-creators';
import { PointsActionCreators } from './points/action-creators';
import { AuthActionCreators } from './auth/action-creators';
import { OrderActionCreators } from './order/action-creators';
import { LanguageActionCreators } from './language/action-creators';
import { RatesActionCreators } from './rates/action-creators';
import { RatesTypeActionCreators } from './rates-type/action-creators';
import { CityActionCreators } from './city/action-creators';
import { OrderStatusActionCreators } from './order-status/action-creators';

export const allActionCreators = {
  ...CarsActionCreators,
  ...CategoriesActionCreators,
  ...CityLocationActionCreators,
  ...PointsActionCreators,
  ...AuthActionCreators,
  ...OrderActionCreators,
  ...LanguageActionCreators,
  ...RatesActionCreators,
  ...CityActionCreators,
  ...OrderStatusActionCreators,
  ...RatesTypeActionCreators,
};
