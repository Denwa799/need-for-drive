import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderStatusSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useParams } from 'react-router-dom';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminErrorLoading } from 'components/ui/AdminErrorLoading';
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
      fetchOrderStatus(Number(id));
    }
  }, [id, orderStatus]);

  return (
    <div>
      {orderStatusIsLoading || orderStatusError ? (
        <AdminErrorLoading loading={orderStatusIsLoading} error={orderStatusError} />
      ) : (
        <div className={styles.AdminOrderStatus}>
          <AdminSuccessError
            successText="Успех! Статус заказа сохранен"
            isSuccess={orderStatusIsCreate}
            errorText={orderStatusCreateError}
            isError={!!orderStatusCreateError}
          />
          <AdminSuccessError
            successText="Успех! Статус заказа удален"
            isSuccess={orderStatusIsDelete}
            errorText={orderStatusDeleteError}
            isError={!!orderStatusDeleteError}
          />
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
