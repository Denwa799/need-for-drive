import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import {
  carsSelector,
  pointsSelector,
  orderSelector,
  orderStatusSelector,
  ratesSelector,
} from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useParams } from 'react-router-dom';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminErrorLoading } from 'components/ui/AdminErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminOrder = () => {
  const { id } = useParams();

  const {
    order,
    orderIsLoading,
    orderError,
    orderIsCreate,
    orderCreateError,
    orderIsDelete,
    orderDeleteError,
  } = useTypedSelector(orderSelector);
  const { carsIsLoading } = useTypedSelector(carsSelector);
  const { pointsIsLoading } = useTypedSelector(pointsSelector);
  const { orderStatusIsLoading } = useTypedSelector(orderStatusSelector);
  const { ratesIsLoading } = useTypedSelector(ratesSelector);

  const {
    fetchOrder,
    cleanOrder,
    setOrderIsCreate,
    setOrderCreateError,
    setOrderIsDelete,
    setOrderDeleteError,
    fetchCars,
    fetchPoints,
    fetchAllOrderStatus,
    fetchRates,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanOrder();
      setOrderIsCreate(false);
      setOrderCreateError('');
      setOrderIsDelete(false);
      setOrderDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(order).length === 0) {
      fetchOrder(id);
      if (!carsIsLoading) fetchCars();
      if (!pointsIsLoading) fetchPoints();
      if (!orderStatusIsLoading) fetchAllOrderStatus();
      if (!ratesIsLoading) fetchRates();
    }
  }, [id, order]);

  return (
    <div>
      {orderIsLoading || orderError ? (
        <AdminErrorLoading loading={orderIsLoading} error={orderError} />
      ) : (
        <div className={styles.AdminOrder}>
          <AdminSuccessError
            successText="Успех! Заказ сохранен"
            isSuccess={orderIsCreate}
            errorText={orderCreateError}
            isError={!!orderCreateError}
          />
          <AdminSuccessError
            successText="Успех! Заказ удален"
            isSuccess={orderIsDelete}
            errorText={orderDeleteError}
            isError={!!orderDeleteError}
          />
          <AdminContainer>
            <AdminTitle>Карточка заказа</AdminTitle>
            <Row>
              <SettingsBlock />
            </Row>
          </AdminContainer>
        </div>
      )}
    </div>
  );
};
