import React, { FC } from 'react';
import cn from 'classnames';
import { Input } from 'antd';
import styles from './styles.module.less';
import { IAdminInput } from './type';

export const AdminInput: FC<IAdminInput> = ({
  onChange,
  value,
  placeholder,
  className,
  danger = false,
  maxLength,
}) => {
  return (
    <div className={styles.AdminInput}>
      <Input
        placeholder={placeholder}
        className={cn(styles.input, className, { [styles.danger]: danger })}
        onChange={onChange}
        value={value}
        status={danger ? 'error' : undefined}
        maxLength={maxLength}
      />
    </div>
  );
};
