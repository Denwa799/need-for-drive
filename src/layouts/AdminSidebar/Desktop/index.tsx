import React, { FC, useState } from 'react';
import { Menu, Row } from 'antd';
import cn from 'classnames';
import LogoSvg from 'components/ui/CustomIcns/LogoSvg';
import Icon, { CarFilled, HomeFilled, ShoppingFilled } from '@ant-design/icons';
import styles from './styles.module.less';
import { IAdminSidebarDesktop } from './type';

export const Desktop: FC<IAdminSidebarDesktop> = ({ adminSidebarItems }) => {
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
                {item.children}
              </Menu.Item>
            );
          })}
        </Menu>
      </Row>
    </div>
  );
};
