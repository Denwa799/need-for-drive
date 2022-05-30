import React, { FC, useCallback } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.less';
import { IAdminErrorLoading } from './type';
import { AdminBtn } from '../AdminBtn';

const antIcon = <LoadingOutlined className={styles.Loader} spin />;

export const AdminErrorLoading: FC<IAdminErrorLoading> = ({ loading, error }) => {
  const navigate = useNavigate();
  const loader = <Spin indicator={antIcon} />;

  const backBtnHandler = useCallback(() => {
    navigate(-1);
  }, []);

  if (loading) {
    return loader;
  }
  if (error) {
    return (
      <div className={styles.AdminErrorLoading}>
        <span className={styles.errorCode}>500</span>
        <span className={styles.errorMsg}>{error}</span>
        <span className={styles.text}>Попробуйте перезагрузить страницу</span>
        <AdminBtn
          onClick={backBtnHandler}
          containerClassName={styles.btnContainer}
          className={styles.btn}
        >
          Назад
        </AdminBtn>
      </div>
    );
  }
  return null;
};
