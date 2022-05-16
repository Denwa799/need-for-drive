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
  isLoading,
}) => {
  return (
    <div className={cn(styles.AdminBtn, containerClassName)}>
      <Button
        type="primary"
        className={cn(
          styles.btn,
          { [styles.red]: type === 'red' },
          { [styles.blue]: type === 'blue' },
          { [styles.gray]: type === 'gray' },
          { [styles.check]: type === 'check' },
          { [styles.more]: type === 'more' },
          { [styles.close]: type === 'close' },
          { [styles.add]: type === 'add' },
          className
        )}
        onClick={onClick}
        icon={icon}
        loading={isLoading}
      >
        {children}
      </Button>
    </div>
  );
};
