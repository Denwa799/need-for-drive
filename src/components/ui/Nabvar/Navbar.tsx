import { Drawer, Menu } from 'antd';
import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.less';
import { RouteNames } from '../../../router';
import MenuToggle from './MenuToggle/MenuToggle';

const Navbar: FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  return (
    <div className={styles.Navbar}>
      <Drawer
        className={styles.Drawer}
        visible={visible}
        placement="left"
        onClose={handleClose}
        key="left"
      >
        <Menu className={styles.Menu} theme="light">
          <Menu.Item key={0}>
            <NavLink to={RouteNames.PARKING} onClick={handleClose}>
              ПАРКОВКА
            </NavLink>
          </Menu.Item>
          <Menu.Item key={1}>
            <NavLink to={RouteNames.INSURANCE} onClick={handleClose}>
              СТРАХОВАНИЕ
            </NavLink>
          </Menu.Item>
          <Menu.Item key={2}>
            <NavLink to={RouteNames.PETROL} onClick={handleClose}>
              БЕНЗИН
            </NavLink>
          </Menu.Item>
          <Menu.Item key={3}>
            <NavLink to={RouteNames.SERVICE} onClick={handleClose}>
              ОБСЛУЖИВАНИЕ
            </NavLink>
          </Menu.Item>
        </Menu>
      </Drawer>
      <MenuToggle onOpen={handleOpen} />
    </div>
  );
};

export default Navbar;
