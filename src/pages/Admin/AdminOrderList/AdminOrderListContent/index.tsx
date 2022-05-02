import React, { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Button, Checkbox, Col, Row, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, MoreOutlined } from '@ant-design/icons/lib';
import defaultImg from 'assets/img/cars/image-1.webp';
import cn from 'classnames';
import AppContainer from 'layouts/AppContainer/AppContainer';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderSelector } from 'store/selectors/selectors';
import { dateString, durationDateString } from 'utils/date';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { AppPagination } from 'components/ui/AppPagination';
import styles from './styles.module.less';
import { PageChangeHandlerType } from './type';
import { AdminOrderListFilteres } from './AdminOrderListFilteres';

const { Title } = Typography;

export const AdminOrderListContent: FC = () => {
  const { orders, ordersCount, orderIsLoading, orderError } = useTypedSelector(orderSelector);
  const errorMessage = 'Нет информации';
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  // Опции размера пагинации для формы "Модель" (FormModel)
  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  // Установка дефолтной картинки при ошибке пути к изображению
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImg;
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
    <AppContainer classNames={styles.container}>
      <Title level={3} className={styles.title}>
        Заказы
      </Title>
      <div className={styles.content}>
        <AdminOrderListFilteres
          limit={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {orderIsLoading ? (
          <ErrorLoading loading={orderIsLoading} error={orderError} />
        ) : (
          <div>
            {orders.map((order) => {
              return (
                <Row className={styles.car} key={order.id}>
                  <Col xl={3} lg={3} md={6} sm={12} xs={24}>
                    <img
                      src={order.carId ? order.carId.thumbnail.path : defaultImg}
                      onError={imageOnErrorHandler}
                      alt={order.carId ? order.carId.name : 'машина'}
                      className={styles.img}
                    />
                  </Col>
                  <Col xl={6} lg={5} md={6} sm={12} xs={24}>
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
                  <Col xl={7} lg={9} md={24} sm={24} xs={24} className={styles.btns}>
                    <Button
                      className={cn(styles.btn, styles.finishBtn)}
                      icon={<CheckOutlined className={cn(styles.icn, styles.checkIcn)} />}
                    >
                      Готово
                    </Button>
                    <Button
                      className={cn(styles.btn, styles.cancelBtn)}
                      icon={<CloseOutlined className={cn(styles.icn, styles.cancelIcn)} />}
                    >
                      Отмена
                    </Button>
                    <Button
                      className={cn(styles.btn, styles.moreBtn)}
                      icon={<MoreOutlined className={cn(styles.icn, styles.moreIcn)} />}
                    >
                      Изменить
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}
      </div>
      <Row className={styles.pagination}>
        <AppPagination
          total={ordersCount}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
          type="blue"
          sizeChangerInvisibleWidth={332}
        />
      </Row>
    </AppContainer>
  );
};
