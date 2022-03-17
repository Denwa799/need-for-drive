import { MenuOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import styles from './MenuToggle.module.less';

interface MenuToggleProps {
  onOpen: (menu: boolean) => void;
}

const MenuToggle: FC<MenuToggleProps> = (props) => {
  function clickHandler() {
    props.onOpen(true);
  }

  return (
    <div>
      <MenuOutlined className={styles.MenuToggle} onClick={() => clickHandler()} />
    </div>
  );
};

export default MenuToggle;
