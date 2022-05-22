import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import {
  carsSelector,
  mapPointsSelector,
  orderSelector,
  orderStatusSelector,
  ratesSelector,
} from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
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
  const { mapPointsIsLoading } = useTypedSelector(mapPointsSelector);
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
      if (!mapPointsIsLoading) fetchPoints();
      if (!orderStatusIsLoading) fetchAllOrderStatus();
      if (!ratesIsLoading) fetchRates();
    }
  }, [id, order]);

  return (
    <div>
      {orderIsLoading || orderError ? (
        <ErrorLoading loading={orderIsLoading} error={orderError} />
      ) : (
        <div className={styles.AdminOrder}>
          {orderIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Заказ сохранен</AdminSuccessMsg>
          ) : null}
          {orderCreateError ? (
            <AdminSuccessMsg type="error">{orderCreateError}</AdminSuccessMsg>
          ) : null}
          {orderIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Заказ удален</AdminSuccessMsg>
          ) : null}
          {orderDeleteError ? (
            <AdminSuccessMsg type="error">{orderDeleteError}</AdminSuccessMsg>
          ) : null}
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
