import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderStatusSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminOrderStatus = () => {
  const { id } = useParams();

  const {
    orderStatus,
    orderStatusIsLoading,
    orderStatusError,
    orderStatusIsCreate,
    orderStatusCreateError,
    orderStatusIsDelete,
    orderStatusDeleteError,
  } = useTypedSelector(orderStatusSelector);

  const {
    fetchOrderStatus,
    cleanOrderStatus,
    setOrderStatusIsCreate,
    setOrderStatusCreateError,
    setOrderStatusIsDelete,
    setOrderStatusDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanOrderStatus();
      setOrderStatusIsCreate(false);
      setOrderStatusCreateError('');
      setOrderStatusIsDelete(false);
      setOrderStatusDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(orderStatus).length === 0) {
      fetchOrderStatus(id);
    }
  }, [id, orderStatus]);

  return (
    <div>
      {orderStatusIsLoading || orderStatusError ? (
        <ErrorLoading loading={orderStatusIsLoading} error={orderStatusError} />
      ) : (
        <div className={styles.AdminOrderStatus}>
          {orderStatusIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Статус заказа сохранен</AdminSuccessMsg>
          ) : null}
          {orderStatusCreateError ? (
            <AdminSuccessMsg type="error">{orderStatusCreateError}</AdminSuccessMsg>
          ) : null}
          {orderStatusIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Статус заказа удален</AdminSuccessMsg>
          ) : null}
          {orderStatusDeleteError ? (
            <AdminSuccessMsg type="error">{orderStatusDeleteError}</AdminSuccessMsg>
          ) : null}
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить статус заказа</AdminTitle>
            ) : (
              <AdminTitle>Карточка статуса заказа</AdminTitle>
            )}
            <Row>
              <SettingsBlock />
            </Row>
          </AdminContainer>
        </div>
      )}
    </div>
  );
};
