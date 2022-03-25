import { MenuOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import styles from './MenuToggle.module.less';
import { MenuToggleProps } from './type';

const MenuToggle: FC<MenuToggleProps> = ({ onOpen }) => {
  function clickHandler() {
    onOpen(true);
  }

  return (
    <div>
      <MenuOutlined className={styles.MenuToggle} onClick={() => clickHandler()} />
    </div>
  );
};

export default MenuToggle;
