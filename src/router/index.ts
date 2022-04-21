import Insurance from 'pages/Insurance/Insurance';
import Main from 'pages/Main/Main';
import Order from 'pages/Order/Order';
import Parking from 'pages/Parking/Parking';
import React from 'react';
import Petrol from 'pages/Petrol/Petrol';
import Service from 'pages/Service/Service';
import { Login } from 'pages/Login';
import { OrderList } from 'pages/admin/OrderList';
import { RouteNames } from './routes';

interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: Main },
  { path: RouteNames.ORDER, component: Order },
  { path: RouteNames.PARKING, component: Parking },
  { path: RouteNames.INSURANCE, component: Insurance },
  { path: RouteNames.PETROL, component: Petrol },
  { path: RouteNames.SERVICE, component: Service },
  { path: RouteNames.LOGIN, component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.ADMIN_ORDER_LIST, component: OrderList },
];
