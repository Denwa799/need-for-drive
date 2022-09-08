import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AdminBackground } from 'components/ui/AdminBackground';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Checkbox, Col, Modal, Row } from 'antd';
import cn from 'classnames';
import { AdminText } from 'components/ui/AdminText';
import { AdminBtn } from 'components/ui/AdminBtn';
import { DangerText } from 'components/ui/DangerText';
import { useTypedSelector } from 'hooks/useTypesSelector';
import {
  carsSelector,
  pointsSelector,
  orderSelector,
  orderStatusSelector,
  ratesSelector,
} from 'store/selectors/selectors';
import { useCookies } from 'react-cookie';
import { useActions } from 'hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { ICar } from 'models/ICar';
import { IPoint } from 'models/IPoint';
import { AdminDatePicker } from 'components/ui/AdminDatePicker';
import moment, { Moment } from 'moment';
import { durationMonth, durationWeek, durationYear } from 'utils/date';
import styles from './styles.module.less';

const { confirm } = Modal;

export const SettingsBlock: FC = () => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const navigate = useNavigate();
  const { id } = useParams();

  const { order, orderIsCreate, orderIsDelete, orderCreateIsLoading, orderDeleteIsLoading } =
    useTypedSelector(orderSelector);
  const { cars, carsIsLoading } = useTypedSelector(carsSelector);
  const { points, pointsIsLoading } = useTypedSelector(pointsSelector);
  const { allOrderStatus, orderStatusIsLoading } = useTypedSelector(orderStatusSelector);
  const { rates, ratesIsLoading } = useTypedSelector(ratesSelector);

  const [carSelected, setCarSelected] = useState({} as ICar);
  const [carNameValue, setCarNameValue] = useState('');
  const [carNameSelectValue, setCarNameSelectValue] = useState('');
  const [carPriceMin, setCarPriceMin] = useState(0);
  const [carNameValidationError, setCarNameValidationError] = useState(false);
  const [carNameErrorText, setCarNameErrorText] = useState('Выберите машину');

  const [cityNameValue, setCityNameValue] = useState('');
  const [cityNameSelectValue, setCityNameSelectValue] = useState('');
  const [cityId, setCityId] = useState(0);
  const [cityNameValidationError, setCityNameValidationError] = useState(false);
  const [cityNameErrorText, setCityNameErrorText] = useState('Выберите город');

  const [colorValue, setColorValue] = useState('');
  const [colorSelectValue, setColorSelectValue] = useState('');
  const [colorValidationError, setColorValidationError] = useState(false);
  const [colorErrorText, setColorErrorText] = useState('Выберите цвет');

  const [pointsInCity, setPointsInCity] = useState([{} as IPoint]);
  const [addressValue, setAddressValue] = useState('');
  const [addressSelectValue, setAddressSelectValue] = useState('');
  const [addressValidationError, setAddressValidationError] = useState(false);
  const [addressErrorText, setAddressErrorText] = useState('Выберите адрес');

  const [startDate, setStartDate] = useState<Moment>();
  const [startDateValidationError, setStartDateValidationError] = useState(false);
  const [startDateErrorText, setStartDateErrorText] = useState('Выберите начальную дату');

  const [endDate, setEndDate] = useState<Moment>();
  const [endDateValidationError, setEndDateValidationError] = useState(false);
  const [endDateErrorText, setEndDateErrorText] = useState('Выберите конечную дату');

  const [rateValue, setRateValue] = useState('');
  const [rateSelectValue, setRateSelectValue] = useState('');
  const [rateUnit, setRateUnit] = useState('');
  const [ratePrice, setRatePrice] = useState(0);
  const [rateId, setRateId] = useState(0);
  const [rateValidationError, setRateValidationError] = useState(false);
  const [rateErrorText, setRateErrorText] = useState('Выберите тариф');

  const [statusValue, setStatusValue] = useState('');
  const [statusSelectValue, setStatusSelectValue] = useState('');
  const [statusId, setStatusId] = useState(0);
  const [statusValidationError, setStatusValidationError] = useState(false);
  const [statusErrorText, setStatusErrorText] = useState('Выберите статус заказа');

  const [isFullTank, setIsFullTank] = useState(false);
  const [isNeedChildChair, setIsNeedChildChair] = useState(false);
  const [isRightWheel, setIsRightWheel] = useState(false);

  const [priceTotal, setPriceTotal] = useState(0);

  // Отфильтровываю метки, где нет данных о городе.
  const filteredPoints = useMemo(
    () => points.filter((point) => !(point.cityId === null)),
    [points]
  );

  // Отфильтровываю тарифы, где нет типа тарифа.
  const filteredRates = useMemo(() => rates.filter((rate) => !(rate.rateTypeId === null)), [rates]);

  const { updateOrder, deleteOrder, setOrderIsDelete, setOrderIsCreate } = useActions();

  // При очистке поля ввода, чистится select state
  useEffect(() => {
    if (!carNameValue) {
      setCarNameSelectValue('');
      setCarSelected({} as ICar);
      setColorValue('');
      setCarPriceMin(0);
    }
    if (!cityNameValue) {
      setCityNameSelectValue('');
      setPointsInCity([]);
      setAddressValue('');
    }
    if (!colorValue) setColorSelectValue('');
    if (!addressValue) setAddressSelectValue('');
    if (!rateValue) setRateSelectValue('');
    if (!statusValue) setStatusSelectValue('');
  }, [carNameValue, cityNameValue, colorValue, addressValue, rateValue, statusValue]);

  // Если есть данные заказа, то подставляет их
  useEffect(() => {
    if (Object.keys(order).length > 0 && id) {
      if (order.carId) {
        setCarNameValue(order.carId.name);
        setCarNameSelectValue(order.carId.name);
        setCarPriceMin(order.carId.priceMin);
      }
      if (order.cityId) {
        setCityNameValue(order.cityId.name);
        setCityNameSelectValue(order.cityId.name);
      }
      if (order.color && order.carId) {
        setColorValue(order.color);
        setColorSelectValue(order.color);
      }
      if (order.pointId && order.cityId) {
        setAddressValue(order.pointId.address);
        setAddressSelectValue(order.pointId.address);
      }
      if (order.dateFrom) setStartDate(moment(order.dateFrom));
      if (order.dateTo) setEndDate(moment(order.dateTo));
      if (order.rateId) {
        setRateValue(order.rateId.rateTypeId.name);
        setRateSelectValue(order.rateId.rateTypeId.name);
        setRatePrice(order.rateId.price);
        setRateUnit(order.rateId.rateTypeId.unit);
      }
      if (order.orderStatusId) {
        setStatusValue(order.orderStatusId.name);
        setStatusSelectValue(order.orderStatusId.name);
      }
      if (order.isFullTank) setIsFullTank(order.isFullTank);
      if (order.isNeedChildChair) setIsNeedChildChair(order.isNeedChildChair);
      if (order.isRightWheel) setIsRightWheel(order.isRightWheel);
    }
  }, [order, id]);

  useEffect(() => {
    if (orderIsCreate)
      setTimeout(() => {
        setOrderIsCreate(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER_LIST}`);
      }, 3000);
    if (orderIsDelete)
      setTimeout(() => {
        setOrderIsDelete(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER_LIST}`);
      }, 3000);
  }, [orderIsCreate, orderIsDelete]);

  /* Создаю массивы для полей autocomplete */
  const carsName = useMemo(() => cars.map((item) => (item.name ? item.name : '')), [cars]);
  const citiesName = useMemo(
    () => filteredPoints.map((item) => (item.cityId ? item.cityId.name : '')),
    [filteredPoints]
  );
  const carColors = useMemo(
    () => (Object.values(carSelected).length > 0 ? carSelected.colors : []),
    [carSelected]
  );
  const pointsAddress = useMemo(
    () => (pointsInCity.length > 0 ? pointsInCity.map((item) => item.address) : []),
    [pointsInCity]
  );
  const ratesName = useMemo(
    () => filteredRates.map((item) => (item.rateTypeId ? item.rateTypeId.name : '')),
    [filteredRates]
  );
  const ordersStatusName = useMemo(
    () => allOrderStatus.map((item) => (item.name ? item.name : '')),
    [allOrderStatus]
  );

  // Удаляю все дубли и null из массива
  const cleanCarsName = useMemo(
    () =>
      carsName.filter(
        (item, index) => carsName.indexOf(item) === index && item !== null && item !== ''
      ),
    [carsName]
  );
  const cleanCitiesName = useMemo(
    () =>
      citiesName.filter(
        (item, index) => citiesName.indexOf(item) === index && item !== null && item !== ''
      ),
    [citiesName]
  );
  const cleanColors = useMemo(
    () =>
      carColors.filter(
        (item, index) => carColors.indexOf(item) === index && item !== null && item !== ''
      ),
    [carColors]
  );
  const cleanPointAddress = useMemo(
    () =>
      pointsAddress.filter(
        (item, index) => pointsAddress.indexOf(item) === index && item !== null && item !== ''
      ),
    [pointsAddress]
  );
  const cleanRates = useMemo(
    () =>
      ratesName.filter(
        (item, index) => ratesName.indexOf(item) === index && item !== null && item !== ''
      ),
    [ratesName]
  );
  const cleanOrdersStatus = useMemo(
    () =>
      ordersStatusName.filter(
        (item, index) => ordersStatusName.indexOf(item) === index && item !== null && item !== ''
      ),
    [ordersStatusName]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCarsName = useMemo(() => {
    return cleanCarsName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanCarsName]);

  const optionsCitiesName = useMemo(() => {
    return cleanCitiesName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanCitiesName]);

  const optionsColors = useMemo(() => {
    return cleanColors.map((color: string) => {
      return {
        value: color,
      };
    });
  }, [cleanColors]);

  const optionsAddress = useMemo(() => {
    return cleanPointAddress.map((address: string) => {
      return {
        value: address,
      };
    });
  }, [cleanPointAddress]);

  const optionsRates = useMemo(() => {
    return cleanRates.map((rate: string) => {
      return {
        value: rate,
      };
    });
  }, [cleanRates]);

  const optionsStatus = useMemo(() => {
    return cleanOrdersStatus.map((status: string) => {
      return {
        value: status,
      };
    });
  }, [cleanOrdersStatus]);

  // Находит объект/массив сущностей, выбранных в полях autocomplete
  const foundCar = useMemo(() => {
    return cars.find((item) => item.name === carNameSelectValue);
  }, [carNameSelectValue]);

  const foundPoints = useMemo(() => {
    return filteredPoints.filter((item) => item.cityId!.name === cityNameSelectValue);
  }, [cityNameSelectValue]);

  const foundPoint = useMemo(() => {
    return foundPoints.find((item) => item.address === addressSelectValue);
  }, [addressSelectValue]);

  const foundRate = useMemo(() => {
    return filteredRates.find((item) => item.rateTypeId!.name === rateSelectValue);
  }, [rateSelectValue]);

  const foundStatus = useMemo(() => {
    return allOrderStatus.find((item) => item.name === statusSelectValue);
  }, [statusSelectValue]);

  useEffect(() => {
    if (foundCar) {
      setCarSelected(foundCar);
      setCarPriceMin(foundCar.priceMin);
    }
    if (foundPoints) {
      if (foundPoints[0]) setCityId(foundPoints[0].cityId!.id);
      setPointsInCity(foundPoints);
    }
    if (foundRate) {
      setRatePrice(foundRate.price);
      setRateUnit(foundRate.rateTypeId!.unit);
      setRateId(foundRate.id);
    }
    if (foundStatus) setStatusId(foundStatus.id);
  }, [foundCar, foundPoints, foundRate, foundStatus]);

  /* Обработчики */
  const carNameHandler = useCallback(
    (value) => {
      setCarNameValue(value);
    },
    [carNameValue]
  );

  const carNameSelectHandler = useCallback(
    (value) => {
      setCarNameSelectValue(value);
      setCarNameValidationError(false);
    },
    [carNameSelectValue]
  );

  const cityNameHandler = useCallback(
    (value) => {
      setCityNameValue(value);
    },
    [cityNameValue]
  );

  const cityNameSelectHandler = useCallback(
    (value) => {
      setCityNameValidationError(false);
      setCityNameSelectValue(value);
    },
    [cityNameSelectValue]
  );

  const colorHandler = useCallback(
    (value) => {
      setColorValue(value);
    },
    [colorValue]
  );

  const colorSelectHandler = useCallback(
    (value) => {
      setColorValidationError(false);
      setColorSelectValue(value);
    },
    [colorSelectValue]
  );

  const addressHandler = useCallback(
    (value) => {
      setAddressValue(value);
    },
    [addressValue]
  );

  const addressSelectHandler = useCallback(
    (value) => {
      setAddressValidationError(false);
      setAddressSelectValue(value);
    },
    [addressSelectValue]
  );

  const rateHandler = useCallback(
    (value) => {
      setRateValue(value);
    },
    [rateValue]
  );

  const rateSelectHandler = useCallback(
    (value) => {
      setRateValidationError(false);
      setRateSelectValue(value);
    },
    [rateSelectValue]
  );

  const statusHandler = useCallback(
    (value) => {
      setStatusValue(value);
    },
    [statusValue]
  );

  const statusSelectHandler = useCallback(
    (value) => {
      setStatusValidationError(false);
      setStatusSelectValue(value);
    },
    [statusSelectValue]
  );

  /* Работа с датой */
  // Отключаю даты, меньше стартовой даты. Для второго поля, до какой даты аренда
  const disabledEndDate = useCallback(
    (current: Moment) => current < moment(startDate),
    [startDate]
  );

  // Обработчики нажатия на даты
  const startDateChangeHandler = useCallback(
    (date: Moment | null) => {
      setEndDate(undefined);
      setStartDateValidationError(false);
      return setStartDate(date!);
    },
    [startDate]
  );
  const endDateChangeHandler = useCallback(
    (date: Moment | null) => {
      setEndDate(date!);
      setEndDateValidationError(false);
    },
    [endDate]
  );

  // Перевожу дату в utc
  const dateStartUtc = useMemo(() => (startDate ? startDate.utc().format() : ''), [startDate]);
  const dateEndUtc = useMemo(() => (endDate ? endDate.utc().format() : ''), [endDate]);

  const fullTankChangeHandler = useCallback(() => setIsFullTank(!isFullTank), [isFullTank]);
  const childSeatChangeHandler = useCallback(
    () => setIsNeedChildChair(!isNeedChildChair),
    [isNeedChildChair]
  );
  const rightWheelChangeHandler = useCallback(() => setIsRightWheel(!isRightWheel), [isRightWheel]);

  /* Подсчет цены */
  const duration = useMemo(
    () => (endDate && startDate ? endDate.diff(startDate) : ''),
    [startDate, endDate]
  );

  const rateActivePrice = useMemo(() => {
    if (duration) {
      switch (rateUnit) {
        case '30 дней':
          return durationMonth(duration) * ratePrice;
        case '7 дней':
          return durationWeek(duration) * ratePrice;
        case '90 дней':
          return Math.ceil(durationMonth(duration) / 3) * ratePrice;
        case '365 дней':
          return durationYear(duration) * ratePrice;
        default:
          return 0;
      }
    }
    return 0;
  }, [duration, rateUnit, ratePrice]);

  useEffect(() => {
    const price = Math.round(
      carPriceMin +
        rateActivePrice +
        (isFullTank ? 500 : 0) +
        (isNeedChildChair ? 200 : 0) +
        (isRightWheel ? 1600 : 0)
    );

    setPriceTotal(price);
  }, [carSelected, rateActivePrice, isFullTank, isNeedChildChair, isRightWheel]);

  /* Отправка итоговых данных */
  const postData = useMemo(() => {
    if (
      statusId &&
      statusSelectValue &&
      cityNameSelectValue &&
      cityId &&
      foundPoint &&
      carSelected &&
      colorSelectValue &&
      dateStartUtc &&
      dateEndUtc &&
      rateId &&
      priceTotal
    )
      return {
        orderStatusId: {
          name: statusSelectValue,
          id: statusId,
        },
        cityId: {
          name: cityNameSelectValue,
          id: cityId,
        },
        pointId: foundPoint.id,
        carId: carSelected.id,
        color: colorSelectValue,
        dateFrom: String(Date.parse(dateStartUtc)),
        dateTo: String(Date.parse(dateEndUtc)),
        rateId,
        price: priceTotal,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
      };
    return null;
  }, [
    statusId,
    statusSelectValue,
    cityNameSelectValue,
    cityId,
    foundPoint,
    carSelected,
    colorSelectValue,
    dateStartUtc,
    dateEndUtc,
    rateId,
    priceTotal,
  ]);

  const saveBtnHandler = useCallback(() => {
    if (!carNameSelectValue) setCarNameValidationError(true);
    if (!cityNameSelectValue) setCityNameValidationError(true);
    if (!colorSelectValue) setColorValidationError(true);
    if (!addressSelectValue) setAddressValidationError(true);
    if (!startDate) setStartDateValidationError(true);
    if (!endDate) setEndDateValidationError(true);
    if (!rateSelectValue) setRateValidationError(true);
    if (!statusSelectValue) setStatusValidationError(true);

    if (postData && id) updateOrder(Number(id), postData, tokenBearer);
  }, [
    postData,
    id,
    carNameSelectValue,
    cityNameSelectValue,
    colorSelectValue,
    addressSelectValue,
    startDate,
    endDate,
    rateSelectValue,
    statusSelectValue,
  ]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить заказ?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deleteOrder(Number(id), tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col span={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки заказа</AdminTitle>
        <Row className={styles.specifications}>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.item, styles.leftBlock)}
          >
            <AdminText>Машина</AdminText>
            <AdminAutocomplete
              options={optionsCarsName}
              value={carNameValue}
              onChange={carNameHandler}
              placeholder="Выберите машину"
              className={styles.inputContainer}
              onSelect={carNameSelectHandler}
              isLoading={carsIsLoading}
              type="second"
              danger={carNameValidationError}
            />
            {carNameValidationError ? <DangerText>{carNameErrorText}</DangerText> : null}
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Город</AdminText>
            <AdminAutocomplete
              options={optionsCitiesName}
              value={cityNameValue}
              onChange={cityNameHandler}
              placeholder="Выберите город"
              className={styles.inputContainer}
              onSelect={cityNameSelectHandler}
              isLoading={pointsIsLoading}
              type="second"
              danger={cityNameValidationError}
            />
            {cityNameValidationError ? <DangerText>{cityNameErrorText}</DangerText> : null}
          </Col>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.item, styles.leftBlock)}
          >
            <AdminText>Цвет</AdminText>
            <AdminAutocomplete
              options={optionsColors}
              value={colorValue}
              onChange={colorHandler}
              placeholder="Выберите цвет"
              className={styles.inputContainer}
              onSelect={colorSelectHandler}
              isLoading={carsIsLoading}
              type="second"
              danger={colorValidationError}
            />
            {colorValidationError ? <DangerText>{colorErrorText}</DangerText> : null}
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Адрес</AdminText>
            <AdminAutocomplete
              options={optionsAddress}
              value={addressValue}
              onChange={addressHandler}
              placeholder="Выберите адрес"
              className={styles.inputContainer}
              onSelect={addressSelectHandler}
              isLoading={pointsIsLoading}
              type="second"
              danger={addressValidationError}
            />
            {addressValidationError ? <DangerText>{addressErrorText}</DangerText> : null}
          </Col>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className={cn(styles.item, styles.leftBlock, styles.dateBlock)}
          >
            <Row>
              <Col
                xxl={12}
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
                className={styles.startDateContainer}
              >
                <AdminText>C</AdminText>
                <AdminDatePicker
                  placeholder="Введите дату и время"
                  className={cn(styles.datePicker, styles.startDate)}
                  onChange={startDateChangeHandler}
                  isDanger={startDateValidationError}
                  value={startDate}
                />
                {startDateValidationError ? <DangerText>{startDateErrorText}</DangerText> : null}
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                <AdminText>По</AdminText>
                <AdminDatePicker
                  placeholder="Введите дату и время"
                  className={cn(styles.datePicker, styles.endDate)}
                  disabledDate={disabledEndDate}
                  onChange={endDateChangeHandler}
                  isDanger={endDateValidationError}
                  value={endDate}
                />
                {endDateValidationError ? <DangerText>{endDateErrorText}</DangerText> : null}
              </Col>
            </Row>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} className={styles.item}>
            <AdminText>Тариф</AdminText>
            <AdminAutocomplete
              options={optionsRates}
              value={rateValue}
              onChange={rateHandler}
              placeholder="Выберите тариф"
              className={styles.inputContainer}
              onSelect={rateSelectHandler}
              isLoading={ratesIsLoading}
              type="second"
              danger={rateValidationError}
            />
            {rateValidationError ? <DangerText>{rateErrorText}</DangerText> : null}
          </Col>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className={cn(styles.item, styles.leftBlock, styles.statusBlock)}
          >
            <AdminText>Статус</AdminText>
            <AdminAutocomplete
              options={optionsStatus}
              value={statusValue}
              onChange={statusHandler}
              placeholder="Выберите статус заказа"
              className={styles.inputContainer}
              onSelect={statusSelectHandler}
              isLoading={orderStatusIsLoading}
              type="second"
              danger={statusValidationError}
            />
            {statusValidationError ? <DangerText>{statusErrorText}</DangerText> : null}
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} className={styles.item}>
            <Row>
              <Col
                xxl={12}
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
                className={styles.checkboxContainer}
              >
                <Checkbox
                  checked={isFullTank}
                  className={styles.checkbox}
                  onChange={fullTankChangeHandler}
                >
                  Полный бак
                </Checkbox>
                <Checkbox
                  checked={isNeedChildChair}
                  className={styles.checkbox}
                  onChange={childSeatChangeHandler}
                >
                  Детское кресло
                </Checkbox>
                <Checkbox
                  checked={isRightWheel}
                  className={styles.checkbox}
                  onChange={rightWheelChangeHandler}
                >
                  Правый руль
                </Checkbox>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.price}>
                {priceTotal.toLocaleString()} ₽
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={orderCreateIsLoading}
            disabled={orderIsCreate || orderIsDelete}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={orderIsCreate || orderIsDelete}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={orderDeleteIsLoading}
              disabled={orderIsCreate || orderIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
