import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { FC } from 'react';
import styles from './ErrorLoading.module.less';

const antIcon = <LoadingOutlined className={styles.Loader} spin />;

interface IErrorLoading {
  loading: boolean;
  error: null | string;
}

const ErrorLoading: FC<IErrorLoading> = ({ loading, error }) => {
  if (error) {
    return <h1>{error}</h1>;
  }
  if (loading) {
    return <Spin indicator={antIcon} />;
  }
  return null;
};

export default ErrorLoading;
