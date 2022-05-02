import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from 'antd';
import styles from './styles.module.less';
import { IAdminBtn } from './type';

export const AdminBtn: FC<IAdminBtn> = ({
  children,
  onClick,
  color = 'blue',
  className,
  containerClassName,
}) => {
  return (
    <div className={cn(styles.AdminBtn, containerClassName)}>
      <Button
        type="primary"
        className={cn(
          styles.btn,
          { [styles.red]: color === 'red' },
          { [styles.blue]: color === 'blue' },
          className
        )}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};
