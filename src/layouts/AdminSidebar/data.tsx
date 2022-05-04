import React from 'react';
import { CarFilled, HomeFilled, ShoppingFilled } from '@ant-design/icons';

const adminSidebarItems = [
  {
    key: 0,
    children: 'Заказы',
    value: 'заказы',
    icon: <ShoppingFilled />,
  },
  {
    key: 1,
    children: 'Список авто',
    value: 'списов авто',
    icon: <CarFilled />,
  },
  {
    key: 2,
    children: 'Города',
    value: 'города',
    icon: <HomeFilled />,
  },
];

export default adminSidebarItems;
