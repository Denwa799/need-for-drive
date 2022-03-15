import React from 'react';
import Main from '../components/pages/Main/Main';
import Parking from '../components/pages/Parking/Parking';
import Insurance from '../components/pages/Insurance/Insurance';
import Petrol from '../components/pages/Petrol/Petrol';
import Service from '../components/pages/Service/Service';

interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  MAIN = '/',
  PARKING = '/parking',
  INSURANCE = '/insurance',
  PETROL = '/petrol',
  SERVICE = '/service',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: Main },
  { path: RouteNames.PARKING, component: Parking },
  { path: RouteNames.INSURANCE, component: Insurance },
  { path: RouteNames.PETROL, component: Petrol },
  { path: RouteNames.SERVICE, component: Service },
];
