import React, { FC, useState } from 'react';
import { Drawer, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.less';
import MenuToggle from './MenuToggle/MenuToggle';
import { RouteNames } from '../../../utils/routes';

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
            <NavLink to="/" onClick={handleClose}>
              СТРАХОВАНИЕ
            </NavLink>
          </Menu.Item>
          <Menu.Item key={2}>
            <NavLink to="/" onClick={handleClose}>
              БЕНЗИН
            </NavLink>
          </Menu.Item>
          <Menu.Item key={3}>
            <NavLink to="/" onClick={handleClose}>
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
