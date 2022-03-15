import React from 'react';
import Main from '../components/pages/Main/Main';
import Order from '../components/pages/Order/Order';

interface IRoute {
  path: string;
  component: React.ComponentType;
  name: string;
}

export enum RouteNames {
  MAIN = '/',
  ORDER = '/order',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: Main, name: 'ГЛАВНАЯ' },
  { path: RouteNames.ORDER, component: Order, name: 'ЗАКАЗЫ' },
];
