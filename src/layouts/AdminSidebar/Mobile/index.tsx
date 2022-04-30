import React, { useState } from 'react';
import { Drawer, Menu, Row } from 'antd';
import cn from 'classnames';
import MenuToggle from 'components/ui/MenuToggle/MenuToggle';
import styles from './styles.module.less';

export const Mobile = () => {
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
        <Row className={styles.title}>Need for car</Row>
        <Row>
          <Menu className={styles.menu}>
            <Menu.Item
              key={0}
              className={cn(styles.item, [selected === 'список авто' ? styles.selected : ''])}
              onClick={(event) => {
                menuItemHandler('список авто');
              }}
            >
              Список авто
            </Menu.Item>
            <Menu.Item
              key={1}
              className={cn(styles.item, [selected === 'заказы' ? styles.selected : ''])}
              onClick={(event) => {
                menuItemHandler('заказы');
              }}
            >
              Заказы
            </Menu.Item>
            <Menu.Item
              key={2}
              className={cn(styles.item, [selected === 'города' ? styles.selected : ''])}
              onClick={(event) => {
                menuItemHandler('города');
              }}
            >
              Города
            </Menu.Item>
          </Menu>
        </Row>
      </Drawer>
      <MenuToggle onOpen={handleOpen} className={styles.burger} />
    </div>
  );
};
