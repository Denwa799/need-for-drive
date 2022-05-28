import React, { FC } from 'react';
import cn from 'classnames';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { IAdminSuccessMsg } from './type';

export const AdminSuccessMsg: FC<IAdminSuccessMsg> = ({ children, type }) => {
  return (
    <div
      className={cn(
        styles.AdminSuccessMsg,
        { [styles.success]: type === 'success' },
        { [styles.error]: type === 'error' }
      )}
    >
      {type === 'success' ? (
        <CheckOutlined className={styles.icon} />
      ) : (
        <CloseOutlined className={styles.icon} />
      )}
      {children}
    </div>
  );
};
