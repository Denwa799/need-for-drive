import React, { useState } from 'react';
import { Col, Menu, Row } from 'antd';
import cn from 'classnames';
import styles from './styles.module.less';

export const AdminSidebar = () => {
  const [selected, setSelected] = useState('');

  const menuItemHandler = (value: string) => {
    setSelected(value);
  };

  return (
    <Col span={4} className={styles.AdminSidebar}>
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
    </Col>
  );
};
