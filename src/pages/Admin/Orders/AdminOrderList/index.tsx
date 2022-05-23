import React, { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Checkbox, Col, Modal, Row } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons/lib';
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
import { useNavigate } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { useActions } from 'hooks/useActions';
import { useCookies } from 'react-cookie';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { AdminOrderListFilters } from './AdminOrderListFilters';
import styles from './styles.module.less';
import { PageChangeHandlerType, CheckCancelBtnHandlerType } from './type';

const { confirm } = Modal;

export const AdminOrderList: FC = () => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const navigate = useNavigate();

  const { orders, ordersCount, ordersIsLoading, orderError, orderIsCreate, orderCreateError } =
    useTypedSelector(orderSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { updateOrder } = useActions();

  const totalOrders = useMemo(() => {
    // Исправляет пустую последнюю страницу в пагинации.
    // Мне кажется сервер немного не верное посчитанное число выдает
    return Math.floor(ordersCount / limit) * limit;
  }, [ordersCount, limit]);

  // Установка дефолтной картинки при ошибке пути к изображению
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = noImage;
  }, []);

  const checkCancelBtnHandler = useCallback<CheckCancelBtnHandlerType>(
    (
      isCheck,
      id,
      cityName,
      cityId,
      pointId,
      carId,
      color,
      dateFrom,
      dateTo,
      rateId,
      price,
      isFullTank,
      isNeedChildChair,
      isRightWheel
    ) => {
      const postData = {
        orderStatusId: {
          name: isCheck ? 'Подтвержденные' : 'Отмененные',
          id: isCheck ? '5e26a1f0099b810b946c5d8b' : '5e26a1f5099b810b946c5d8c',
        },
        cityId: {
          name: cityName,
          id: cityId,
        },
        pointId,
        carId,
        color,
        dateFrom,
        dateTo,
        rateId,
        price,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
      };
      confirm({
        title: `Вы действительно хотите ${isCheck ? 'подтвердить' : 'отменить'} заказ?`,
        icon: <ExclamationCircleOutlined />,
        okText: 'Да',
        cancelText: 'Нет',
        className: 'appConfirmModal',
        onOk() {
          if (!cityId || !cityName) return alert('В заказе нет информации о городе');
          if (!pointId) return alert('В заказе нет информации о пункте выдачи');
          if (!carId) return alert('В заказе нет информации о машине');
          if (!color) return alert('В заказе нет информации о цвете');
          if (dateFrom <= 0) return alert('В заказе нет информации, с какой даты действует заказ');
          if (dateTo <= 0) return alert('В заказе нет информации, до какой даты действует заказ');
          if (!rateId) return alert('В заказе нет информации о тарифе');
          if (price <= 0) return alert('В заказе нет информации о цене');

          return updateOrder(id, postData, tokenBearer);
        },
      });
    },
    []
  );

  const changeBtnHandler = useCallback((id: string) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER}/${id}`);
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
      {orderIsCreate ? (
        <AdminSuccessMsg type="success">Успех! Заказ сохранен</AdminSuccessMsg>
      ) : null}
      {orderCreateError ? <AdminSuccessMsg type="error">{orderCreateError}</AdminSuccessMsg> : null}
      <AdminContainer>
        <AdminTitle>Заказы</AdminTitle>
        <AdminList>
          <AdminOrderListFilters
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {ordersIsLoading || orderError ? (
            <ErrorLoading loading={ordersIsLoading} error={orderError} />
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
                      {order.price ? `${order.price.toLocaleString()} ₽` : errorMessage}
                    </Col>
                    <Col xl={6} lg={8} md={24} sm={24} xs={24} className={styles.btns}>
                      {order.orderStatusId && order.orderStatusId.name !== 'Подтвержденные' ? (
                        <AdminBtn
                          onClick={() =>
                            checkCancelBtnHandler(
                              true,
                              order.id,
                              order.cityId ? order.cityId.name : '',
                              order.cityId ? order.cityId.id : '',
                              order.pointId ? order.pointId.id : '',
                              order.carId ? order.carId.id : '',
                              order.color ? order.color : '',
                              order.dateFrom ? order.dateFrom : 0,
                              order.dateTo ? order.dateTo : 0,
                              order.rateId ? order.rateId.id : '',
                              order.price ? order.price : 0,
                              order.isFullTank,
                              order.isNeedChildChair,
                              order.isRightWheel
                            )
                          }
                          disabled={orderIsCreate}
                          type="check"
                          icon={<CheckOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Готово
                        </AdminBtn>
                      ) : null}
                      {order.orderStatusId && order.orderStatusId.name !== 'Отмененные' ? (
                        <AdminBtn
                          onClick={() =>
                            checkCancelBtnHandler(
                              false,
                              order.id,
                              order.cityId ? order.cityId.name : '',
                              order.cityId ? order.cityId.id : '',
                              order.pointId ? order.pointId.id : '',
                              order.carId ? order.carId.id : '',
                              order.color ? order.color : '',
                              order.dateFrom ? order.dateFrom : 0,
                              order.dateTo ? order.dateTo : 0,
                              order.rateId ? order.rateId.id : '',
                              order.price ? order.price : 0,
                              order.isFullTank,
                              order.isNeedChildChair,
                              order.isRightWheel
                            )
                          }
                          disabled={orderIsCreate}
                          type="close"
                          icon={<CloseOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Отмена
                        </AdminBtn>
                      ) : null}
                      <AdminBtn
                        onClick={() => changeBtnHandler(order.id)}
                        disabled={orderIsCreate}
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
          sizeChangerInvisibleWidth={460}
        />
      </AdminContainer>
    </div>
  );
};
