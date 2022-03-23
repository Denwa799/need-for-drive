import React, { FC, useEffect, useState } from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import styles from './Order.module.less';
import Navigation from '../../ui/Navigation/Navigation';
import AppHeader from '../../ui/AppLayout/AppHeader/AppHeader';
import AppContainer from '../../ui/AppLayout/AppContainer/AppContainer';
import FormLocation from './FormLocation/FormLocation';
import PriceForm from './PriceForm/PriceForm';
import { useTypedSelector } from '../../../hooks/useTypesSelector';
import { mapPointsSelector } from '../../../store/selectors/selectors';
import { useActionsMapPoints } from '../../../hooks/useActions/useActionsMapPoints';

const Order: FC = () => {
  // Стейт для формы "местоположение" (FormLocation)
  const { mapPointsError, mapPointsIsLoading } = useTypedSelector(mapPointsSelector);
  const { points } = useTypedSelector(mapPointsSelector);

  // Локальный стейт для формы "местоположение" (FormLocation)
  const [cityValue, setCityValue] = useState('');
  const [pointValue, setPointValue] = useState('');

  // Запрос на получение меток карты из api для формы "местоположение" (FormLocation)
  const { fetchPoints } = useActionsMapPoints();

  useEffect(() => {
    fetchPoints();
  }, []);

  // Отфильтровываю метки, где нет данных о городе.
  // Так как считаю, что это ошибка тестового api, потому что адрес без города это не правильно
  const filteredPoints = points.filter((point) => !(point.cityId === null));

  const optionsCity = filteredPoints.map((point) => {
    return {
      value: point.cityId!.name,
    };
  });

  const optionsName = filteredPoints.map((point) => {
    return {
      value: point.name,
    };
  });

  return (
    <Row className={styles.Order}>
      <Navigation />
      <Col xl={23} lg={22} md={22} sm={22} xs={24} className={styles.mainContent}>
        <AppContainer>
          <AppHeader />
        </AppContainer>
        <hr className={styles.hrTop} />
        <AppContainer>
          <Breadcrumb separator="►" className={styles.breadcrumb}>
            <Breadcrumb.Item className={styles.breadcrumbActive}>Местоположение</Breadcrumb.Item>
            <Breadcrumb.Item>Модель</Breadcrumb.Item>
            <Breadcrumb.Item>Дополнительно</Breadcrumb.Item>
            <Breadcrumb.Item className={styles.breadcrumbFinal}>Итого</Breadcrumb.Item>
          </Breadcrumb>
        </AppContainer>
        <hr />
        <Row>
          <Col xl={14} lg={12} md={24} sm={24} xs={24} className={styles.mainForm}>
            <AppContainer>
              <FormLocation
                optionsCity={optionsCity}
                optionsName={optionsName}
                cityValue={cityValue}
                setCityValue={setCityValue}
                pointValue={pointValue}
                setPointValue={setPointValue}
              />
            </AppContainer>
          </Col>
          <Col xl={10} lg={12} md={24} sm={24} xs={24}>
            <AppContainer>
              <PriceForm />
            </AppContainer>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Order;
