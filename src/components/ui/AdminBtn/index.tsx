import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from 'antd';
import styles from './styles.module.less';
import { IAdminBtn } from './type';

export const AdminBtn: FC<IAdminBtn> = ({
  children,
  onClick,
  type = 'blue',
  className,
  containerClassName,
  icon,
}) => {
  return (
    <div className={cn(styles.AdminBtn, containerClassName)}>
      <Button
        type="primary"
        className={cn(
          styles.btn,
          { [styles.red]: type === 'red' },
          { [styles.blue]: type === 'blue' },
          { [styles.check]: type === 'check' },
          { [styles.more]: type === 'more' },
          { [styles.close]: type === 'close' },
          className
        )}
        onClick={onClick}
        icon={icon}
      >
        {children}
      </Button>
    </div>
  );
};
