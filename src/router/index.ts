import Insurance from 'pages/Insurance/Insurance';
import Main from 'pages/Main/Main';
import Order from 'pages/Order/Order';
import Parking from 'pages/Parking/Parking';
import React from 'react';
import Petrol from 'pages/Petrol/Petrol';
import Service from 'pages/Service/Service';
import { Login } from 'pages/Login';
import { OrderId } from 'pages/Order/OrderId';
import { AdminCarsList } from 'pages/Admin/AdminCarsList';
import { AdminOrderList } from 'pages/Admin/AdminOrderList';
import { AdminCityList } from 'pages/Admin/AdminCityList';
import { AdminPointList } from 'pages/Admin/AdminPointList';
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
];
