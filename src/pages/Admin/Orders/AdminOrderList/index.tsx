import React, { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Button, Checkbox, Col, Row } from 'antd';
import { CheckOutlined, CloseOutlined, MoreOutlined } from '@ant-design/icons/lib';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import noImage from 'assets/img/noImage.webp';
import { AdminPagination } from 'components/ui/AdminPagination';
import { AdminContainer } from 'layouts/AdminContainer';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderSelector } from 'store/selectors/selectors';
import { dateString, durationDateString } from 'utils/date';
import { AdminBtn } from 'components/ui/AdminBtn';
import { errorMessage } from 'utils/errorMessage';
import { AdminOrderListFilters } from './AdminOrderListFilters';
import styles from './styles.module.less';
import { PageChangeHandlerType } from './type';

export const AdminOrderList: FC = () => {
  const { orders, ordersCount, orderIsLoading, orderError } = useTypedSelector(orderSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const totalOrders = useMemo(() => {
    // Исправляет пустую последнюю страницу в пагинации.
    // Мне кажется сервер немного не верное посчитанное число выдает
    return Math.floor(ordersCount / limit) * limit;
  }, [ordersCount, limit]);

  // Установка дефолтной картинки при ошибке пути к изображению
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = noImage;
  }, []);

  const checkBtnHandler = useCallback(() => {
    alert('Подтвердить заказ');
  }, []);

  const cancleBtnHandler = useCallback(() => {
    alert('Отменить заказ');
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить заказ');
  }, []);

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  return (
    <div className={styles.AdminOrderList}>
      <AdminContainer>
        <AdminTitle>Заказы</AdminTitle>
        <AdminList>
          <AdminOrderListFilters
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {orderIsLoading || orderError ? (
            <ErrorLoading loading={orderIsLoading} error={orderError} />
          ) : (
            <div>
              {orders.map((order) => {
                return (
                  <Row className={styles.car} key={order.id}>
                    <Col xl={3} lg={3} md={6} sm={12} xs={24}>
                      <img
                        src={order.carId ? order.carId.thumbnail.path : noImage}
                        onError={imageOnErrorHandler}
                        alt={order.carId ? order.carId.name : 'машина'}
                        className={styles.img}
                      />
                    </Col>
                    <Col xl={7} lg={6} md={6} sm={12} xs={24}>
                      <p className={styles.description}>
                        <b>{order.carId ? order.carId.name : errorMessage}</b> в{' '}
                        <b>{order.cityId ? order.cityId.name : errorMessage}</b>,{' '}
                        {order.pointId ? order.pointId.address : errorMessage}
                      </p>
                      <p className={styles.description}>
                        {order.dateFrom ? dateString(order.dateFrom) : errorMessage} —{' '}
                        {order.dateTo ? dateString(order.dateTo) : errorMessage}
                      </p>
                      <p className={styles.description}>
                        Цвет: <b>{order.color ? order.color : errorMessage}</b>
                      </p>
                      <p className={styles.description}>
                        Длительность аренды:{' '}
                        <b>
                          {order.dateFrom && order.dateTo
                            ? durationDateString(order.dateFrom, order.dateTo)
                            : errorMessage}
                        </b>
                      </p>
                      <p className={styles.description}>
                        Статус:{' '}
                        <b>{order.orderStatusId ? order.orderStatusId.name : errorMessage}</b>
                      </p>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12} xs={24} className={styles.additional}>
                      <Checkbox className={styles.checkbox} checked={order.isFullTank}>
                        Полный бак
                      </Checkbox>
                      <Checkbox className={styles.checkbox} checked={order.isNeedChildChair}>
                        Детское кресло
                      </Checkbox>
                      <Checkbox className={styles.checkbox} checked={order.isRightWheel}>
                        Правый руль
                      </Checkbox>
                    </Col>
                    <Col xl={4} lg={3} md={6} sm={12} xs={24} className={styles.price}>
                      {order.price ? order.price.toLocaleString() : errorMessage} ₽
                    </Col>
                    <Col xl={6} lg={8} md={24} sm={24} xs={24} className={styles.btns}>
                      {order.orderStatusId && order.orderStatusId.name !== 'Подтвержденные' ? (
                        <AdminBtn
                          onClick={checkBtnHandler}
                          type="check"
                          icon={<CheckOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Готово
                        </AdminBtn>
                      ) : null}
                      {order.orderStatusId && order.orderStatusId.name !== 'Отмененые' ? (
                        <AdminBtn
                          onClick={cancleBtnHandler}
                          type="close"
                          icon={<CloseOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Отмена
                        </AdminBtn>
                      ) : null}
                      <AdminBtn
                        onClick={changeBtnHandler}
                        type="more"
                        icon={<MoreOutlined />}
                        containerClassName={styles.btnContainer}
                        className={styles.btn}
                      >
                        Изменить
                      </AdminBtn>
                    </Col>
                  </Row>
                );
              })}
            </div>
          )}
        </AdminList>
        <AdminPagination
          total={totalOrders}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
          sizeChangerInvisibleWidth={332}
        />
      </AdminContainer>
    </div>
  );
};
