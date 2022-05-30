import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Typography, Affix, Col, Layout, Row } from 'antd';
import Navigation from 'components/ui/Navigation/Navigation';
import { cityLocationSelector, pointsSelector, orderSelector } from 'store/selectors/selectors';
import { useTypedSelector } from 'hooks/useTypesSelector';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import AppContainer from 'layouts/AppContainer/AppContainer';
import AppHeader from 'layouts/AppHeader/AppHeader';
import useDebounce from 'hooks/useDebounce';
import { useActions } from 'hooks/useActions';
import { ICar } from 'models/ICar';
import { AppModal } from 'components/ui/AppModal';
import ButtonApp from 'components/ui/ButtonApp/ButtonApp';
import moment, { Moment } from 'moment';
import { useNavigate } from 'react-router-dom';
import PriceForm from './PriceForm/PriceForm';
import { FormTotal } from './FormTotal';
import FormModel from './FormModel/FormModel';
import FormLocation from './FormLocation/FormLocation';
import styles from './Order.module.less';
import { OrderBreadcrumb } from './OrderBreadcrumb';
import { FormAdditionally } from './FormAdditionally';

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
  const { points, pointsError, pointsIsLoading } = useTypedSelector(pointsSelector);

  // Локальный стейт для формы "местоположение" (FormLocation)
  const [cityValue, setCityValue] = useState(city);
  const debouncedCityValue = useDebounce<string>(cityValue, 500);
  const [pointValue, setPointValue] = useState('');
  const debouncedPointValue = useDebounce<string>(pointValue, 500);
  const [activePointAddress, setActivePointAddress] = useState('');
  const [activePointId, setActivePointId] = useState('');
  const [activePointCity, setActivePointCity] = useState(city);
  const [activeCityId, setActiveCityId] = useState('');

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
  const filteredPoints = useMemo(
    () => points.filter((point) => !(point.cityId === null)),
    [points]
  );

  // Создаю массив городов для поля поиска города в форме "местоположение" (FormLocation)
  const optionsCity = useMemo(() => {
    return filteredPoints.map((point) => {
      return {
        value: point.cityId!.name,
      };
    });
  }, [filteredPoints]);

  // Отфильтровываю города для карты исходя из поля поиска
  const filteredCityPoints = useMemo(
    () => filteredPoints.filter((point) => point.cityId!.name === debouncedCityValue),
    [filteredPoints, debouncedCityValue]
  );

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
  const [selectedCar, setSelectedCar] = useState<ICar>();
  const [activeCarId, setActiveCarId] = useState('');
  const [activeCar, setActiveCar] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [carColors, setCarColors] = useState<string[]>([]);

  // Опции размера пагинации для формы "Модель" (FormModel)
  const pageSizeOptions = useMemo(() => ['2', '4', '6', '8', '10', '12'], []);

  /* Блок с данными для формы дополнительных параметров (FormAdditionally) */
  // Локальный стейт для формы "Дополнительно" (FormAdditionally)
  const [color, setColor] = useState('');
  const [startDate, setStartDate] = useState<Moment>(useCallback(() => moment(), []));
  const [endDate, setEndDate] = useState<Moment>();
  const [rate, setRate] = useState('');
  const [ratePrice, setRatePrice] = useState(0);
  const [rateUnit, setRateUnit] = useState('');
  const [rateId, setRateId] = useState('');
  const [isFullTank, setIsFullTank] = useState(false);
  const [isNeedChildChair, setIsNeedChildChair] = useState(false);
  const [isRightWheel, setIsRightWheel] = useState(false);

  // Высчитывает разницу во времени, чтобы узнать длительность аренды
  const duration = useMemo(() => (endDate ? endDate.diff(startDate) : ''), [endDate]);

  // Переводит разницу в строку для отображения
  const durationString = useMemo(() => {
    if (duration) {
      const days = Math.floor(moment.duration(duration).asDays());
      const hourse = Math.floor(moment.duration(duration).asHours()) - 24 * days;
      return `${days}д ${hourse}ч`;
    }
    return '';
  }, [duration]);

  // Переводит разницу в количество минут
  const durationMin = useMemo(
    () => (duration && rateUnit === 'мин' ? moment.duration(duration).asMinutes() : 0),
    [duration, rateUnit]
  );

  // Переводит разницу в количество дней
  const durationDays = useMemo(
    () => (duration && rateUnit === 'сутки' ? Math.ceil(moment.duration(duration).asDays()) : 0),
    [duration, rateUnit]
  );

  // Переводит разницу в количество недель
  const durationWeek = useMemo(
    () => (duration && rateUnit === '7 дней' ? Math.ceil(moment.duration(duration).asWeeks()) : 0),
    [duration, rateUnit]
  );

  // Переводит разницу в количество месяцев
  const durationMonth = useMemo(
    () =>
      duration && (rateUnit === '30 дней' || rateUnit === '90 дней')
        ? Math.ceil(moment.duration(duration).asMonths())
        : 0,
    [duration, rateUnit]
  );

  // Переводит разницу в количество лет
  const durationYear = useMemo(
    () =>
      duration && rateUnit === '365 дней' ? Math.ceil(moment.duration(duration).asYears()) : 0,
    [duration, rateUnit]
  );

  const rateActivePrice = useMemo(() => {
    switch (rateUnit) {
      case '30 дней':
        return durationMonth * ratePrice;
      case 'мин':
        return durationMin * ratePrice;
      case 'сутки':
        return durationDays * ratePrice;
      case '7 дней':
        return durationWeek * ratePrice;
      case '90 дней':
        return Math.ceil(durationMonth / 3) * ratePrice;
      case '365 дней':
        return durationYear * ratePrice;
      default:
        return 0;
    }
  }, [durationMin, durationDays, durationWeek, durationMonth, durationYear, rateUnit, ratePrice]);

  const price = useMemo(() => {
    return Math.round(
      priceMin +
        rateActivePrice +
        (isFullTank ? 500 : 0) +
        (isNeedChildChair ? 200 : 0) +
        (isRightWheel ? 1600 : 0)
    );
  }, [priceMin, rateActivePrice, isFullTank, isNeedChildChair, isRightWheel]);

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
  const { createOrder, setOrderId } = useActions();

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

  // Перевожу дату в utc
  const dateStartUtc = useMemo(() => (startDate ? startDate.utc().format() : ''), [startDate]);
  const dateEndUtc = useMemo(() => (endDate ? endDate.utc().format() : ''), [endDate]);

  const orderPost = {
    orderStatusId: {
      name: 'Новые',
      id: '5e26a191099b810b946c5d89',
    },
    cityId: {
      name: activePointCity,
      id: activeCityId,
    },
    pointId: activePointId,
    carId: activeCarId,
    color,
    dateFrom: Date.parse(dateStartUtc),
    dateTo: Date.parse(dateEndUtc),
    rateId,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  };

  const priceFormTotalButtonHandler = () => {
    setModalActive(true);
  };

  // Обработчики для кнопок подтверждения и отмены
  const confirmModalBtnHandler = useCallback(() => {
    createOrder(orderPost);
    setModalActive(false);
  }, [modalActive]);

  const backModalBtnHandler = useCallback(() => {
    setModalActive(false);
  }, [modalActive]);

  const clearFormModel = useCallback(() => {
    setActiveCarId('');
    setActiveCar('');
    setPriceMin(0);
    setPriceMax(0);
    setCarColors([]);
  }, []);

  // Функция очистки стейта для формы "Дополнительно" (FormAdditionally)
  const clearFormAdditionally = useCallback(() => {
    setColor('');
    setStartDate(moment());
    setEndDate(undefined);
    setRate('');
    setIsFullTank(false);
    setIsNeedChildChair(false);
    setIsRightWheel(false);
  }, []);

  /* Отрисовка вкладок */
  const ComponentFormLoc = (
    <FormLocation
      optionsCity={optionsCity}
      optionsName={optionsName}
      cityValue={cityValue}
      setCityValue={setCityValue}
      debouncedCityValue={debouncedCityValue}
      pointValue={pointValue}
      setPointValue={setPointValue}
      debouncedPointValue={debouncedPointValue}
      points={filteredCityPoints}
      setActivePointAddress={setActivePointAddress}
      setActivePointId={setActivePointId}
      setActivePointCity={setActivePointCity}
      setActiveCityId={setActiveCityId}
      clearFormModel={clearFormModel}
      clearFormAdditionally={clearFormAdditionally}
      setMaxStage={setMaxStage}
    />
  );

  function renderForms() {
    switch (activeStage) {
      case 1:
        if (pointsIsLoading || pointsError) {
          return <ErrorLoading loading={pointsIsLoading} error={pointsError} />;
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
            setCarColors={setCarColors}
            pageSizeOptions={pageSizeOptions}
            clearFormAdditionally={clearFormAdditionally}
            setMaxStage={setMaxStage}
          />
        );
      case 3:
        return (
          <FormAdditionally
            carColors={carColors}
            color={color}
            setColor={setColor}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            rate={rate}
            setRate={setRate}
            setRatePrice={setRatePrice}
            setRateUnit={setRateUnit}
            setRateId={setRateId}
            isFullTank={isFullTank}
            setIsFullTank={setIsFullTank}
            isNeedChildChair={isNeedChildChair}
            setIsNeedChildChair={setIsNeedChildChair}
            isRightWheel={isRightWheel}
            setIsRightWheel={setIsRightWheel}
          />
        );
      case 4:
        return (
          <FormTotal
            selectedCar={selectedCar}
            isFullTank={isFullTank}
            startDate={startDate}
            endDate={endDate}
          />
        );
      default:
        return ComponentFormLoc;
    }
  }

  return (
    <Row className={styles.Order}>
      <Col xl={1} lg={1} md={2} sm={2} xs={24}>
        <Navigation />
      </Col>
      <Col xl={23} lg={23} md={22} sm={24} xs={24} className={styles.mainContent}>
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
                    city={activePointCity}
                    address={activePointAddress}
                    locationButtonHandler={priceFormLocationButtonHandler}
                    modelButtonHandler={priceFormModelButtonHandler}
                    additionallyButtonHandler={priceFormAdditionallyButtonHandler}
                    priceFormTotalButtonHandler={priceFormTotalButtonHandler}
                    modelName={activeCar}
                    price={price}
                    priceMin={priceMin}
                    priceMax={priceMax}
                    orderIsLoading={orderIsLoading}
                    orderError={orderError}
                    color={color}
                    duration={durationString}
                    rate={rate}
                    isFullTank={isFullTank}
                    isNeedChildChair={isNeedChildChair}
                    isRightWheel={isRightWheel}
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
