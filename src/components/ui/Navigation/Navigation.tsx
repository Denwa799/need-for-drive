import React, { FC } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { RouteNames } from '../../../router';

const Navigation: FC = () => {
  return (
    <div>
      <Menu theme="light" mode="horizontal">
        <Menu.Item key={0}>
          <NavLink to={RouteNames.PARKING}>ПАРКОВКА</NavLink>
        </Menu.Item>
        <Menu.Item key={1}>
          <NavLink to={RouteNames.INSURANCE}>СТРАХОВАНИЕ</NavLink>
        </Menu.Item>
        <Menu.Item key={2}>
          <NavLink to={RouteNames.PETROL}>БЕНЗИН</NavLink>
        </Menu.Item>
        <Menu.Item key={3}>
          <NavLink to={RouteNames.SERVICE}>ОБСЛУЖИВАНИЕ</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigation;
