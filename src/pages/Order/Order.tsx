import React, { FC, useEffect, useMemo, useState } from 'react';
import { Affix, Col, Layout, Row } from 'antd';
import Navigation from 'components/ui/Navigation/Navigation';
import { cityLocationSelector, mapPointsSelector } from 'store/selectors/selectors';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { useActionsCityLocation } from 'hooks/useActions/useActionsCityLocation';
import { useActionsMapPoints } from 'hooks/useActions/useActionsMapPoints';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import AppContainer from 'layouts/AppContainer/AppContainer';
import AppHeader from 'layouts/AppHeader/AppHeader';
import FormTotal from './FormTotal/FormTotal';
import FormModel from './FormModel/FormModel';
import FormAdditionally from './FormAdditionally/FormAdditionally';
import FormLocation from './FormLocation/FormLocation';
import PriceForm from './PriceForm/PriceForm';
import styles from './Order.module.less';
import { OrderBreadcrumb } from './OrderBreadcrumb';

const Order: FC = () => {
  /* Блок с общими данными для страницы */
  // Локальный стейт активной стадии заполнения формы и максимально доступной
  const [activeStage, setActiveStage] = useState(1);
  const [maxStage, setMaxStage] = useState(1);

  // Беру значение города для шапки сайта из store
  const { city } = useTypedSelector(cityLocationSelector);

  /* Блок с данными для формы "местоположение" (FormLocation) */
  // Стейт для формы "местоположение" (FormLocation)
  const { mapPointsError, mapPointsIsLoading } = useTypedSelector(mapPointsSelector);
  const { points } = useTypedSelector(mapPointsSelector);

  // Локальный стейт для формы "местоположение" (FormLocation)
  const [cityValue, setCityValue] = useState(city);
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
  const filteredPoints = useMemo(() => {
    return points.filter((point) => !(point.cityId === null));
  }, [points]);

  // Создаю массив городов для поля поиска города в форме "местоположение" (FormLocation)
  const optionsCity = useMemo(() => {
    return filteredPoints.map((point) => {
      return {
        value: point.cityId!.name,
      };
    });
  }, [filteredPoints]);

  // Отфильтровываю города для карты исходя из поля поиска
  const filteredCityPoints = useMemo(() => {
    return filteredPoints.filter((point) => point.cityId!.name === cityValue);
  }, [filteredPoints, cityValue]);

  // Создаю массив названий пунктов для поля поиска пункта в форме "местоположение" (FormLocation)
  const optionsName = useMemo(() => {
    return filteredCityPoints.map((point) => {
      return {
        value: point.address,
      };
    });
  }, [filteredCityPoints]);

  /* Блок с данными для формы "Модель" (FormModel) */
  // Локальный стейт для формы "Модель" (FormModel)
  const [activeCarId, setActiveCarId] = useState('');
  const [activeCar, setActiveCar] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  // Локальный стейт для фильтрации в radio button в форме "Модель" (FormModel)
  const [filterCarsValue, setFilterCarsValue] = useState('Все');

  // Опции размера пагинации для формы "Модель" (FormModel)
  const pageSizeOptions = useMemo(() => {
    return ['2', '4', '6', '8', '10', '12'];
  }, []);

  /* Блок с данными для формы заказа (PriceForm) */
  // Обработчики переключения вкладок для кнопкоп в PriceForm
  const priceFormLocationButtonHandler = () => {
    setActiveStage(2);
    setMaxStage(2);
  };
  const priceFormModelButtonHandler = () => {
    setActiveStage(3);
    setMaxStage(3);
  };
  const priceFormAdditionallyButtonHandler = () => {
    setActiveStage(4);
    setMaxStage(4);
  };

  /* Отрисовка вкладок */
  const ComponentFormLoc = (
    <FormLocation
      optionsCity={optionsCity}
      optionsName={optionsName}
      cityValue={cityValue}
      setCityValue={setCityValue}
      pointValue={pointValue}
      setPointValue={setPointValue}
      points={filteredCityPoints}
      setActivePointAddress={setActivePointAddress}
      setActivePointCity={setActivePointCity}
    />
  );

  function renderForms() {
    if (mapPointsIsLoading || mapPointsError) {
      return <ErrorLoading loading={mapPointsIsLoading} error={mapPointsError} />;
    }
    switch (activeStage) {
      case 1:
        return ComponentFormLoc;
      case 2:
        return (
          <FormModel
            activeCarId={activeCarId}
            activeCar={activeCar}
            setActiveCarId={setActiveCarId}
            setActiveCar={setActiveCar}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            filterValue={filterCarsValue}
            setFilterValue={setFilterCarsValue}
            pageSizeOptions={pageSizeOptions}
          />
        );
      case 3:
        return <FormAdditionally />;
      case 4:
        return <FormTotal />;
      default:
        return ComponentFormLoc;
    }
  }

  return (
    <Row className={styles.Order}>
      <Col xl={1} lg={2} md={2} sm={2} xs={24}>
        <Navigation />
      </Col>
      <Col xl={23} lg={22} md={22} sm={22} xs={24} className={styles.mainContent}>
        <Affix offsetTop={0}>
          <div className={styles.headerContainer}>
            <AppContainer>
              <AppHeader />
            </AppContainer>
            <AppContainer classNames={styles.breadcrumbContainer}>
              <OrderBreadcrumb
                activeStage={activeStage}
                maxStage={maxStage}
                setActiveStage={setActiveStage}
              />
            </AppContainer>
          </div>
        </Affix>
        <Row>
          <Col xl={14} lg={12} md={24} sm={24} xs={24} className={styles.mainForm}>
            <Layout.Content>
              <AppContainer>{renderForms()}</AppContainer>
            </Layout.Content>
          </Col>
          <Col xl={10} lg={12} md={24} sm={24} xs={24}>
            <Affix offsetTop={145}>
              <Layout.Content>
                <AppContainer>
                  <PriceForm
                    maxStage={maxStage}
                    address={activePointAddress}
                    locationButtonHandler={priceFormLocationButtonHandler}
                    modelButtonHandler={priceFormModelButtonHandler}
                    additionallyButtonHandler={priceFormAdditionallyButtonHandler}
                    modelName={activeCar}
                    priceMin={priceMin}
                    priceMax={priceMax}
                  />
                </AppContainer>
              </Layout.Content>
            </Affix>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Order;
