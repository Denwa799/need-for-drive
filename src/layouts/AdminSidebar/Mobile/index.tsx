import React, { FC, useState } from 'react';
import { Drawer, Menu, Row } from 'antd';
import cn from 'classnames';
import MenuToggle from 'components/ui/MenuToggle/MenuToggle';
import LogoSvg from 'components/ui/CustomIcns/LogoSvg';
import Icon from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.less';
import { IAdminSidebarMobile } from './type';

export const Mobile: FC<IAdminSidebarMobile> = ({ adminSidebarItems }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const drawerStyle = {
    backgroundColor: 'white',
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const menuItemHandler = (value: string) => {
    setSelected(value);
    setVisible(false);
  };

  return (
    <div className={styles.AdminMobileSidebar}>
      <Drawer
        className={styles.Drawer}
        visible={visible}
        placement="left"
        onClose={handleClose}
        key="left"
        headerStyle={drawerStyle}
        bodyStyle={drawerStyle}
      >
        <Row className={styles.title}>
          <Icon className={styles.logo} component={LogoSvg} />
          Need for car
        </Row>
        <Row>
          <Menu className={styles.menu}>
            {adminSidebarItems.map((item) => {
              return (
                <Menu.Item
                  key={item.key}
                  className={cn(styles.item, [selected === item.value ? styles.selected : ''])}
                  onClick={(event) => {
                    menuItemHandler(item.value);
                  }}
                  icon={item.icon}
                >
                  <NavLink to={item.route}>{item.children}</NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        </Row>
      </Drawer>
      <MenuToggle onOpen={handleOpen} className={styles.burger} />
    </div>
  );
};
