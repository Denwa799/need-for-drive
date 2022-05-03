import { MenuOutlined } from '@ant-design/icons';
import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import styles from './MenuToggle.module.less';
import { MenuToggleProps } from './type';

const MenuToggle: FC<MenuToggleProps> = ({ onOpen, className }) => {
  const clickHandler = useCallback(() => {
    onOpen(true);
  }, []);

  return (
    <div>
      <MenuOutlined className={cn(styles.MenuToggle, className)} onClick={clickHandler} />
    </div>
  );
};

export default MenuToggle;
