import React, { FC } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { publicRoutes } from '../../../router';

const Navigation: FC = () => {
  return (
    <div>
      <Menu theme="light" mode="horizontal">
        {publicRoutes.map((route) => (
          <Menu.Item key={route.path}>
            <NavLink to={route.path}>{route.name}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navigation;
