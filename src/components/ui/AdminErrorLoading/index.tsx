import React, { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { IAdminErrorLoading } from './type';

const antIcon = <LoadingOutlined className={styles.Loader} spin />;

export const AdminErrorLoading: FC<IAdminErrorLoading> = ({ loading, error }) => {
  const loader = <Spin indicator={antIcon} />;

  if (loading) {
    return loader;
  }
  if (error) {
    return (
      <div className={styles.AdminErrorLoading}>
        <span className={styles.errorCode}>500</span>
        <span className={styles.errorMsg}>{error}</span>
        <span className={styles.text}>Попробуйте перезагрузить страницу</span>
      </div>
    );
  }
  return null;
};
