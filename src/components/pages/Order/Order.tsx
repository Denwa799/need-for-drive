import React, { FC, useEffect, useState } from 'react';
import { Affix, Breadcrumb, Col, Layout, Row } from 'antd';
import cn from 'classnames';
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
import FormModel from './FormModel/FormModel';
import FormAdditionally from './FormAdditionally/FormAdditionally';
import FormTotal from './FormTotal/FormTotal';

const Order: FC = () => {
  /* Блок с общими данными для страницы */

  // Локальный стейт активной стадии заполнения формы и максимально доступной
  const [activeStage, setActiveStage] = useState(1);
  const [maxStage, setMaxStage] = useState(1);

  // Беру значение города для шапки сайта из store
  const { city } = useTypedSelector(cityLocationSelector);

  // Стили для Breadcrumb.Item
  const breadcrumbLocation = cn(
    styles.breadcrumbItem,
    { [styles.breadcrumbActive]: activeStage === 1 },
    { [styles.breadcrumbComplete]: maxStage >= 2 }
  );
  const breadcrumbModel = cn(
    styles.breadcrumbItem,
    { [styles.breadcrumbActive]: activeStage === 2 },
    { [styles.breadcrumbComplete]: maxStage >= 3 }
  );
  const breadcrumbAdditionally = cn(
    styles.breadcrumbItem,
    { [styles.breadcrumbActive]: activeStage === 3 },
    { [styles.breadcrumbComplete]: maxStage >= 4 }
  );
  const breadcrumbTotal = cn(styles.breadcrumbItem, styles.breadcrumbFinal, {
    [styles.breadcrumbActive]: activeStage === 4,
  });

  // Обработчики переключение вкладок в панели breadcrumb
  const breadcrumbLocationHandler = () => {
    setActiveStage(1);
  };
  const breadcrumbModelHandler = () => {
    if (maxStage >= 2) setActiveStage(2);
  };
  const breadcrumbAdditionallyHandler = () => {
    if (maxStage >= 3) setActiveStage(3);
  };
  const breadcrumbTotalHandler = () => {
    if (maxStage >= 4) setActiveStage(4);
  };

  /* Конец блока с общими данными для страницы */

  /* Блок с данными для формы "местоположение" (FormLocation) */

  // Стейт для формы "местоположение" (FormLocation)
  const { mapPointsError, mapPointsIsLoading } = useTypedSelector(mapPointsSelector);
  const { points } = useTypedSelector(mapPointsSelector);

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

  /* Конец блока с данными для формы "местоположение" (FormLocation) */

  /* Блок с данными для формы "Модель" (FormModel) */

  // Локальный стейт для формы "Модель" (FormModel)
  const [activeCar, setActiveCar] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  // Локальный стейт для фильтрации в radio button в форме "Модель" (FormModel)
  const [filterCarsValue, setFilterCarsValue] = useState('Все');

  // Опции размера пагинации для формы "Модель" (FormModel)
  const pageSizeOptions = ['2', '4', '6', '8'];

  /* Конец блок с данными для формы "Модель" (FormModel) */

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

  /* Конец блока с данными для формы заказа (PriceForm) */

  /* Отрисовка вкладок */

  const ComponentFormLoc = (
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
            activeCar={activeCar}
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
      <Navigation />
      <Col xl={23} lg={22} md={22} sm={22} xs={24} className={styles.mainContent}>
        <Affix offsetTop={0}>
          <div className={styles.affixHeader}>
            <AppContainer>
              <AppHeader />
            </AppContainer>
            <hr className={styles.hrTop} />
            <AppContainer>
              <Breadcrumb separator="►" className={styles.breadcrumb}>
                <Breadcrumb.Item className={breadcrumbLocation} onClick={breadcrumbLocationHandler}>
                  Местоположение
                </Breadcrumb.Item>
                <Breadcrumb.Item className={breadcrumbModel} onClick={breadcrumbModelHandler}>
                  Модель
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className={breadcrumbAdditionally}
                  onClick={breadcrumbAdditionallyHandler}
                >
                  Дополнительно
                </Breadcrumb.Item>
                <Breadcrumb.Item className={breadcrumbTotal} onClick={breadcrumbTotalHandler}>
                  Итого
                </Breadcrumb.Item>
              </Breadcrumb>
            </AppContainer>
            <hr />
          </div>
        </Affix>

        <Row>
          <Col xl={14} lg={12} md={24} sm={24} xs={24} className={styles.mainForm}>
            <Layout.Content>
              <AppContainer>{renderForms()}</AppContainer>
            </Layout.Content>
          </Col>

          <Col xl={10} lg={12} md={24} sm={24} xs={24}>
            <Affix offsetTop={135}>
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
