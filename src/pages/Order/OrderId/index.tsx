import { Col, Row, Typography } from 'antd';
import React, { FC, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Navigation from 'components/ui/Navigation/Navigation';
import AppContainer from 'layouts/AppContainer/AppContainer';
import AppHeader from 'layouts/AppHeader/AppHeader';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import defaultImg from 'assets/img/cars/image-1.webp';
import styles from './styles.module.less';
import PriceForm from '../PriceForm/PriceForm';

const { Title, Text } = Typography;

export const OrderId: FC = () => {
  // Стейт для страницы
  const { id } = useParams();
  const { order, orderId, orderIsLoading, orderError } = useTypedSelector(orderSelector);
  const { fetchOrder, setOrderId } = useActions();

  // Локальный стейт страницы
  const [address, setAddress] = useState('');
  const [model, setModel] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  // Как только появляется id заказа, то происходит запрос на получение его данных
  useEffect(() => {
    if (id) {
      setOrderId(id);
    }
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [id, orderId]);

  // Устанавливаю значение города в шапку сайта
  const { setCityLocation } = useActions();
  useEffect(() => {
    if (order.cityId.name) {
      setCityLocation(order.cityId.name);
    }
  }, [order]);

  // Когда появляется заказ, то вставляю данные в price form
  useEffect(() => {
    if (order) {
      setAddress(`${order.cityId.name}, ${order.pointId.address}`);
      setModel(order.carId.name);
      setPriceMin(order.carId.priceMin);
      setPriceMax(order.carId.priceMax);
    }
  }, [order]);

  // Вставляет дефолтную картинку, если путь до изображения с ошибкой
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImg;
  }, []);

  const regCarNumber = useMemo(() => {
    // В регулярном выражении ищутся все цифры от 1 символа и более, и затем перед и после них ставится пробел
    const reg = /\d{1,}/g;
    if (order) {
      return order.carId.number.replace(reg, ` $& `);
    }
    return '';
  }, [order]);

  const dateFrom = useMemo(() => {
    return moment(order.dateFrom).format('DD.MM.YYYY hh:mm');
  }, [order.dateFrom]);

  const dateTo = useMemo(() => {
    return moment(order.dateTo).format('DD.MM.YYYY hh:mm');
  }, [order.dateTo]);

  return (
    <Row className={styles.OrderId}>
      <Col xl={1} lg={2} md={2} sm={2} xs={24}>
        <Navigation />
      </Col>
      <Col xl={23} lg={22} md={22} sm={22} xs={24} className={styles.mainContent}>
        <AppContainer>
          <AppHeader />
        </AppContainer>
        {!orderIsLoading ? (
          <div>
            <AppContainer classNames={styles.orderNumber}>
              <div className={styles.text__bold}>
                Заказ номер <Text className={styles.text__uppercase}>{orderId}</Text>
              </div>
            </AppContainer>
            <AppContainer>
              <Row>
                <Col xl={14} lg={12} md={24} sm={24} xs={24}>
                  <Row className={styles.orderBlock}>
                    <Col xl={12} lg={24} md={12} sm={12} xs={24}>
                      <Title className={styles.title}>Ваш заказ подтверждён</Title>
                      <Title level={4} className={styles.carName}>
                        {order.carId.name}
                      </Title>
                      <Row className={styles.textContainer}>
                        <Text className={styles.number}>{regCarNumber}</Text>
                      </Row>
                      <Row className={styles.textContainer}>
                        <Text className={styles.text__light}>
                          <b className={styles.text__bold}>Топливо</b> {order.carId.tank}%
                        </Text>
                      </Row>
                      <Row className={styles.textContainer}>
                        <Text className={styles.text__light}>
                          <b className={styles.text__bold}>Доступна с</b> {dateFrom}
                        </Text>
                      </Row>
                      <Row className={styles.textContainer}>
                        <Text className={styles.text__light}>
                          <b className={styles.text__bold}>Доступна по</b> {dateTo}
                        </Text>
                      </Row>
                    </Col>
                    <Col xl={12} lg={24} md={12} sm={12} xs={24} className={styles.imgBlock}>
                      <div className={styles.imgContainer}>
                        <img
                          src={order.carId.thumbnail.path}
                          alt={order.carId.name}
                          onError={imageOnErrorHandler}
                          className={styles.img}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xl={10} lg={12} md={24} sm={24} xs={24}>
                  <PriceForm
                    maxStage={5}
                    address={address}
                    modelName={model}
                    priceMin={priceMin}
                    priceMax={priceMax}
                  />
                </Col>
              </Row>
            </AppContainer>
          </div>
        ) : (
          <ErrorLoading loading={orderIsLoading} error={orderError} />
        )}
      </Col>
    </Row>
  );
};
