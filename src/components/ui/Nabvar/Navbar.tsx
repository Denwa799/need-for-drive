import React, { FC, useState } from 'react';
import { Drawer, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Icon from '@ant-design/icons';
import styles from './Navbar.module.less';
import MenuToggle from './MenuToggle/MenuToggle';
import { RouteNames } from '../../../utils/routes';
import TelegramSvg from '../CustomIcns/TelegramSvg';
import FacebookSvg from '../CustomIcns/FacebookSvg';
import InstagramSvg from '../CustomIcns/InstagramSvg';
import ButtonChange from '../ButtonChange/ButtonChange';

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
        size="large"
      >
        <Menu className={styles.Menu} theme="dark">
          <Menu.Item key={0}>
            <NavLink to={RouteNames.PARKING} onClick={handleClose} className={styles.link}>
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
        <div className={styles.networksIcons}>
          <Icon className={styles.icon} component={TelegramSvg} />
          <Icon className={styles.icon} component={FacebookSvg} />
          <Icon className={styles.icon} component={InstagramSvg} />
        </div>
        <div className={styles.langButton}>
          <ButtonChange>Eng</ButtonChange>
        </div>
      </Drawer>
      <MenuToggle onOpen={handleOpen} />
    </div>
  );
};

export default Navbar;
