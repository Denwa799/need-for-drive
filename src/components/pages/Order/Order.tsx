import React, { FC, useEffect, useState } from 'react';
import { Breadcrumb, Col, Layout, Row } from 'antd';
import styles from './Order.module.less';
import Navigation from '../../ui/Navigation/Navigation';
import AppHeader from '../../ui/AppLayout/AppHeader/AppHeader';
import AppContainer from '../../ui/AppLayout/AppContainer/AppContainer';
import FormLocation from './FormLocation/FormLocation';
import PriceForm from './PriceForm/PriceForm';
import { useTypedSelector } from '../../../hooks/useTypesSelector';
import { cityLocationSelector, mapPointsSelector } from '../../../store/selectors/selectors';
import { useActionsMapPoints } from '../../../hooks/useActions/useActionsMapPoints';
import ErrorLoading from '../../ui/ErrorLoading/ErrorLoading';
import { useActionsCityLocation } from '../../../hooks/useActions/useActionsCityLocation';

const Order: FC = () => {
  // Стейт для формы "местоположение" (FormLocation)
  const { mapPointsError, mapPointsIsLoading } = useTypedSelector(mapPointsSelector);
  const { points } = useTypedSelector(mapPointsSelector);

  // Беру значение города для шапки сайта из store
  const { city } = useTypedSelector(cityLocationSelector);

  // Локальный стейт для формы "местоположение" (FormLocation)
  const [cityValue, setCityValue] = useState('');
  const [pointValue, setPointValue] = useState('');
  const [activePointAddress, setActivePointAddress] = useState('');
  const [activePointCity, setActivePointCity] = useState(city);

  // Устанавливаю значение города в шапку сайта
  const { setCityLocation } = useActionsCityLocation();
  useEffect(() => {
    setCityLocation(activePointCity);
  }, [activePointCity]);

  // Запрос на получение меток карты из api для формы "местоположение" (FormLocation)
  const { fetchPoints } = useActionsMapPoints();

  useEffect(() => {
    fetchPoints();
  }, []);

  // Отфильтровываю метки, где нет данных о городе.
  // Так как считаю, что это ошибка тестового api, потому что адрес без города - это не правильно
  const filteredPoints = points.filter((point) => !(point.cityId === null));

  // Создаю массив городов для поля поиска города в форме "местоположение" (FormLocation)
  const optionsCity = filteredPoints.map((point) => {
    return {
      value: point.cityId!.name,
    };
  });

  // Создаю массив названий пунктов для поля поиска пункта в форме "местоположение" (FormLocation)
  const optionsName = filteredPoints.map((point) => {
    return {
      value: point.address,
    };
  });

  function renderFormLocation() {
    if (mapPointsIsLoading || mapPointsError) {
      return <ErrorLoading loading={mapPointsIsLoading} error={mapPointsError} />;
    }
    return (
      <FormLocation
        optionsCity={optionsCity}
        optionsName={optionsName}
        cityValue={cityValue}
        setCityValue={setCityValue}
        pointValue={pointValue}
        setPointValue={setPointValue}
        points={filteredPoints}
        setActivePointAddress={setActivePointAddress}
        setActivePointCity={setActivePointCity}
      />
    );
  }

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
            <Layout.Content>
              <AppContainer>{renderFormLocation()}</AppContainer>
            </Layout.Content>
          </Col>
          <Col xl={10} lg={12} md={24} sm={24} xs={24}>
            <Layout.Content>
              <AppContainer>
                <PriceForm address={activePointAddress} />
              </AppContainer>
            </Layout.Content>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Order;
