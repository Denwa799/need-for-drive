import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { FC } from 'react';
import styles from './ErrorLoading.module.less';
import { IErrorLoading } from './type';

const antIcon = <LoadingOutlined className={styles.Loader} spin />;

const ErrorLoading: FC<IErrorLoading> = ({ loading, error, isLarge, errorClassName }) => {
  if (error) {
    return <h1 className={errorClassName}>{error}</h1>;
  }
  if (loading) {
    return <Spin indicator={antIcon} size={isLarge ? 'large' : 'default'} />;
  }
  return null;
};

export default ErrorLoading;
