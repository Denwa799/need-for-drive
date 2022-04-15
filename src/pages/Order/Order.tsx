import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Typography, Affix, Col, Layout, Row } from 'antd';
import Navigation from 'components/ui/Navigation/Navigation';
import { cityLocationSelector, mapPointsSelector, orderSelector } from 'store/selectors/selectors';
import { useTypedSelector } from 'hooks/useTypesSelector';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import AppContainer from 'layouts/AppContainer/AppContainer';
import AppHeader from 'layouts/AppHeader/AppHeader';
import { useActions } from 'hooks/useActions';
import { ICar } from 'models/ICar';
import { AppModal } from 'components/ui/AppModal';
import ButtonApp from 'components/ui/ButtonApp/ButtonApp';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import FormModel from './FormModel/FormModel';
import FormAdditionally from './FormAdditionally/FormAdditionally';
import FormLocation from './FormLocation/FormLocation';
import PriceForm from './PriceForm/PriceForm';
import styles from './Order.module.less';
import { OrderBreadcrumb } from './OrderBreadcrumb';
import { FormTotal } from './FormTotal';

const { Text } = Typography;

const Order: FC = () => {
  /* Блок с общими данными для страницы */
  // Локальный стейт активной стадии заполнения формы и максимально доступной
  const [activeStage, setActiveStage] = useState(1);
  const [maxStage, setMaxStage] = useState(1);

  // Беру значение города для шапки сайта из store
  const { city } = useTypedSelector(cityLocationSelector);

  /* Блок с данными для формы "местоположение" (FormLocation) */
  // Стейт для формы "местоположение" (FormLocation)
  const { points, mapPointsError, mapPointsIsLoading } = useTypedSelector(mapPointsSelector);

  // Локальный стейт для формы "местоположение" (FormLocation)
  const [cityValue, setCityValue] = useState('');
  const [pointValue, setPointValue] = useState('');
  const [activePointAddress, setActivePointAddress] = useState('');
  const [activePointCity, setActivePointCity] = useState(city);

  // Устанавливаю значение города в шапку сайта
  const { setCityLocation } = useActions();
  useEffect(() => {
    setCityLocation(activePointCity);
  }, [activePointCity]);

  // Запрос на получение меток карты из api для формы "местоположение" (FormLocation)
  const { fetchPoints } = useActions();
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

  /* Блок с данными для формы "Модель" (FormModel) */

  // Локальный стейт для формы "Модель" (FormModel)
  const [selectedCar, setSelectedCar] = useState<ICar>();
  const [activeCarId, setActiveCarId] = useState('');
  const [activeCar, setActiveCar] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

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

  /* Блок с данными для итогового модального окна */

  // Стейт с итоговыми данными запроса order
  const { orderId, orderIsLoading, orderError } = useTypedSelector(orderSelector);
  const navigate = useNavigate();

  // Запрос на отправку данных заказа и выставляющий id выполненного order
  const { sendOrder, setOrderId } = useActions();

  // Сбрасываю активный order id при инициализации страницы
  // И если есть order id и есть 4 этап, то перенаправляю на страницу заказа
  useEffect(() => {
    if (maxStage === 1) {
      setOrderId('');
    }
    if (maxStage >= 4 && orderId) {
      navigate(`/order/${orderId}`);
    }
  }, [orderId]);

  // Локальный стейт
  const [modalActive, setModalActive] = useState(false);

  // Создаю моковые даты
  const mockDateStart = moment('13.04.2022 12:00', 'DD.MM.YYYY hh:mm');
  const mockDateEnd = moment('14.04.2022 12:00', 'DD.MM.YYYY hh:mm');

  // Перевожу дату в utc
  const mockDateStartUtc = moment.utc(mockDateStart).format();
  const mockDateEndUtc = moment.utc(mockDateEnd).format();

  const mockOrderPost = {
    orderStatusId: {
      name: 'Новые',
      id: '5e26a191099b810b946c5d89',
    },
    cityId: {
      name: 'Ульяновск',
      id: '61b30fe9bb7a006c05c54e2b',
    },
    pointId: '61b310cfbb7a006c05c54e2c',
    carId: '600fff0bad015e0bb6997d79',
    color: 'Синий',
    dateFrom: Date.parse(mockDateStartUtc),
    dateTo: Date.parse(mockDateEndUtc),
    rateId: '6114e4a02aed9a0b9b850848',
    price: 20000,
    isFullTank: true,
    isNeedChildChair: true,
    isRightWheel: true,
  };

  const priceFormTotalButtonHandler = () => {
    setModalActive(true);
  };

  // Обработчики для кнопок подтверждения и отмены
  const confirmModalBtnHandler = useCallback(() => {
    sendOrder(mockOrderPost);
    setModalActive(false);
  }, [modalActive]);

  const backModalBtnHandler = useCallback(() => {
    setModalActive(false);
  }, [modalActive]);

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
    switch (activeStage) {
      case 1:
        if (mapPointsIsLoading || mapPointsError) {
          return <ErrorLoading loading={mapPointsIsLoading} error={mapPointsError} />;
        }
        return ComponentFormLoc;

      case 2:
        return (
          <FormModel
            activeCarId={activeCarId}
            activeCar={activeCar}
            setActiveCarId={setActiveCarId}
            setActiveCar={setActiveCar}
            setSelectedCar={setSelectedCar}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            pageSizeOptions={pageSizeOptions}
          />
        );
      case 3:
        return <FormAdditionally />;
      case 4:
        return <FormTotal selectedCar={selectedCar} />;
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
                    priceFormTotalButtonHandler={priceFormTotalButtonHandler}
                    modelName={activeCar}
                    priceMin={priceMin}
                    priceMax={priceMax}
                    orderIsLoading={orderIsLoading}
                    orderError={orderError}
                  />
                </AppContainer>
              </Layout.Content>
            </Affix>
          </Col>
        </Row>
      </Col>
      <AppModal active={modalActive}>
        <div className={styles.modalContainer}>
          <Row className={styles.modalText}>
            <Col span={24}>
              <Text>Подтвердить заказ</Text>
            </Col>
          </Row>
          <Row>
            <Col sm={12} xs={24}>
              <ButtonApp className={styles.confirmBtn} onClick={confirmModalBtnHandler}>
                Подтвердить
              </ButtonApp>
            </Col>
            <Col sm={12} xs={24}>
              <ButtonApp className={styles.backBtn} type="red" onClick={backModalBtnHandler}>
                Вернуться
              </ButtonApp>
            </Col>
          </Row>
        </div>
      </AppModal>
    </Row>
  );
};

export default Order;
