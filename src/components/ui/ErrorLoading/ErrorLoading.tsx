import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './ErrorLoading.module.less';
import { IErrorLoading } from './type';

const antIcon = <LoadingOutlined className={styles.Loader} spin />;

const ErrorLoading: FC<IErrorLoading> = ({ loading, error, content, type = 'primary' }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const loader = <Spin indicator={antIcon} />;

  const modalCancelHandler = useCallback(() => {
    setModalVisible(false);
  }, []);

  // Сбрасывает видимость модального окна при появлении загрузки
  useEffect(() => {
    setModalVisible(true);
  }, [loading]);

  switch (type) {
    case 'primary':
      if (error) {
        return <h1>{error}</h1>;
      }
      if (loading) {
        return loader;
      }
      return null;
    case 'modal':
      if (error && content) {
        return (
          <div>
            {content}
            <Modal
              title={error}
              visible={modalVisible}
              footer={null}
              onCancel={modalCancelHandler}
            />
          </div>
        );
      }
      if (loading) {
        return loader;
      }
      return null;
    default:
      if (error) {
        return <h1>{error}</h1>;
      }
      if (loading) {
        return loader;
      }
      return null;
  }
};

export default ErrorLoading;
