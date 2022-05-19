import Insurance from 'pages/Insurance/Insurance';
import Main from 'pages/Main/Main';
import Order from 'pages/Order/Order';
import Parking from 'pages/Parking/Parking';
import React from 'react';
import Petrol from 'pages/Petrol/Petrol';
import Service from 'pages/Service/Service';
import { Login } from 'pages/Login';
import { OrderId } from 'pages/Order/OrderId';
import { AdminCarsList } from 'pages/Admin/Cars/AdminCarsList';
import { AdminOrderList } from 'pages/Admin/Orders/AdminOrderList';
import { AdminCityList } from 'pages/Admin/Cities/AdminCityList';
import { AdminPointList } from 'pages/Admin/Points/AdminPointList';
import { AdminCategoryList } from 'pages/Admin/Categories/AdminCategoryList';
import { AdminRateList } from 'pages/Admin/Rates/AdminRateList';
import { AdminRateType } from 'pages/Admin/Rates/AdminRateTypeList';
import { AdminOrderStatusList } from 'pages/Admin/Orders/AdminOrderStatusList';
import { AdminCar } from 'pages/Admin/Cars/AdminCar';
import { AdminCity } from 'pages/Admin/Cities/AdminCity';
import { AdminPoint } from 'pages/Admin/Points/AdminPoint';
import { AdminCategory } from 'pages/Admin/Categories/AdminCategory';
import { RouteNames } from './routes';

interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: Main },
  { path: RouteNames.ORDER, component: Order },
  { path: RouteNames.ORDER_ID, component: OrderId },
  { path: RouteNames.PARKING, component: Parking },
  { path: RouteNames.INSURANCE, component: Insurance },
  { path: RouteNames.PETROL, component: Petrol },
  { path: RouteNames.SERVICE, component: Service },
  { path: RouteNames.LOGIN, component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.ADMIN_CARS_LIST, component: AdminCarsList },
  { path: RouteNames.ADMIN_ORDER_LIST, component: AdminOrderList },
  { path: RouteNames.ADMIN_CITY_LIST, component: AdminCityList },
  { path: RouteNames.ADMIN_POINT_LIST, component: AdminPointList },
  { path: RouteNames.ADMIN_CATEGORY_LIST, component: AdminCategoryList },
  { path: RouteNames.ADMIN_RATE_LIST, component: AdminRateList },
  { path: RouteNames.ADMIN_RATE_TYPE_LIST, component: AdminRateType },
  { path: RouteNames.ADMIN_ORDER_STATUS_LIST, component: AdminOrderStatusList },
  { path: RouteNames.ADMIN_CAR, component: AdminCar },
  { path: RouteNames.ADMIN_CAR_EDIT, component: AdminCar },
  { path: RouteNames.ADMIN_CITY, component: AdminCity },
  { path: RouteNames.ADMIN_CITY_EDIT, component: AdminCity },
  { path: RouteNames.ADMIN_POINT, component: AdminPoint },
  { path: RouteNames.ADMIN_POINT_EDIT, component: AdminPoint },
  { path: RouteNames.ADMIN_CATEGORY, component: AdminCategory },
  { path: RouteNames.ADMIN_CATEGORY_EDIT, component: AdminCategory },
];
