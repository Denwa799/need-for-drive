import React from 'react';
import {
  CarFilled,
  HomeFilled,
  ProfileFilled,
  ShopFilled,
  ShoppingFilled,
} from '@ant-design/icons';
import { RouteNames } from 'router/routes';

const adminSidebarItems = [
  {
    key: 0,
    children: 'Заказы',
    value: 'заказы',
    icon: <ShoppingFilled />,
    route: `/admin/${RouteNames.ADMIN_ORDER_LIST}`,
  },
  {
    key: 1,
    children: 'Список авто',
    value: 'списов авто',
    icon: <CarFilled />,
    route: `/admin/${RouteNames.ADMIN_CARS_LIST}`,
  },
  {
    key: 2,
    children: 'Города',
    value: 'города',
    icon: <HomeFilled />,
    route: `/admin/${RouteNames.ADMIN_CITY_LIST}`,
  },
  {
    key: 3,
    children: 'Пункты выдачи',
    value: 'пункты',
    icon: <ShopFilled />,
    route: `/admin/${RouteNames.ADMIN_POINT_LIST}`,
  },
  {
    key: 4,
    children: 'Категории машин',
    value: 'категории',
    icon: <ProfileFilled />,
    route: `/admin/${RouteNames.ADMIN_CATEGORY_LIST}`,
  },
];

export default adminSidebarItems;
