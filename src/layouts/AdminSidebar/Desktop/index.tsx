import React, { useState } from 'react';
import { Menu, Row } from 'antd';
import cn from 'classnames';
import LogoSvg from 'components/ui/CustomIcns/LogoSvg';
import Icon from '@ant-design/icons';
import styles from './styles.module.less';

export const Desktop = () => {
  const [selected, setSelected] = useState('');

  const menuItemHandler = (value: string) => {
    setSelected(value);
  };

  return (
    <div className={styles.Desktop}>
      <Row className={styles.title}>
        <Icon className={styles.logo} component={LogoSvg} /> Need for car
      </Row>
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
    </div>
  );
};