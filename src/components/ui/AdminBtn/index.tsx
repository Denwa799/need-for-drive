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
  disabled,
}) => {
  const buttonType = cn(
    { [styles.red]: type === 'red' },
    { [styles.pink]: type === 'pink' },
    { [styles.blue]: type === 'blue' },
    { [styles.gray]: type === 'gray' },
    { [styles.check]: type === 'check' },
    { [styles.more]: type === 'more' },
    { [styles.close]: type === 'close' },
    { [styles.add]: type === 'add' }
  );

  return (
    <div className={cn(styles.AdminBtn, containerClassName)}>
      <Button
        type="primary"
        className={cn(styles.btn, buttonType, className)}
        onClick={onClick}
        icon={icon}
        loading={isLoading}
        disabled={disabled}
      >
        {children}
      </Button>
    </div>
  );
};
