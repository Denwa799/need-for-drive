import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector, citySelector, orderStatusSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import useDebounce from 'hooks/useDebounce';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import styles from './styles.module.less';
import { FilterOptionType, IAdminOrderListFilteres } from './type';

export const AdminOrderListFilteres: FC<IAdminOrderListFilteres> = ({
  limit,
  currentPage,
  setCurrentPage,
}) => {
  const { cars, carsIsLoading, carsError } = useTypedSelector(carsSelector);
  const { city, cityIsLoading, cityError } = useTypedSelector(citySelector);
  const { allOrderStatus, orderStatusIsLoading, orderStatusError } =
    useTypedSelector(orderStatusSelector);

  const [carNameFilter, setCarNameFilter] = useState('');
  const debouncedCarNameFilter = useDebounce<string>(carNameFilter, 500);

  const [cityFilter, setCityFilter] = useState('');
  const debouncedCityFilter = useDebounce<string>(cityFilter, 500);

  const [orderStatusFilter, setOrderStatusFilter] = useState('');
  const debouncedOrderStatusFilter = useDebounce<string>(orderStatusFilter, 500);

  const [carColorFilter, setCarColorFilter] = useState('');
  const debouncedCarColorFilter = useDebounce<string>(carColorFilter, 500);

  const { fetchAllOrders, fetchCars, fetchCity, fetchAllOrderStatus } = useActions();

  useEffect(() => {
    fetchCars();
    fetchCity();
    fetchAllOrderStatus();
  }, []);

  // Создаю массив для поля фильтрации
  const carsName = useMemo(() => cars.map((car) => car.name), [cars]);
  const carsColor = useMemo(() => cars.map((car) => car.colors), [cars]);

  // Поднимаю вложенные массивы цветов на один уровень
  const allColors = useMemo(
    () => carsColor.reduce((accumulator, value) => accumulator.concat(value), []),
    [carsColor]
  );

  // Удаляю все дубли из массива
  const cleanCarsName = useMemo(
    () => carsName.filter((item, index) => carsName.indexOf(item) === index),
    [carsName]
  );

  const cleanCarsColor = useMemo(
    () => allColors.filter((item, index) => allColors.indexOf(item) === index),
    [allColors]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCarsName = useMemo(() => {
    return cleanCarsName.map((name) => {
      return {
        value: name,
      };
    });
  }, [cleanCarsName]);

  const optionsCityName = useMemo(() => {
    return city.map((item) => {
      return {
        value: item.name,
      };
    });
  }, [city]);

  const optionsOrderStatus = useMemo(() => {
    return allOrderStatus.map((orderStatus) => {
      return {
        value: orderStatus.name,
      };
    });
  }, [allOrderStatus]);

  const optionsCarColors = useMemo(() => {
    return cleanCarsColor.map((color) => {
      return {
        value: color,
      };
    });
  }, [cleanCarsColor]);

  // Провожу поиск объекта по имени, введенному в поле поиска
  const carNameId = useMemo(
    () =>
      cars.find(
        (car) => car.name.toLocaleLowerCase() === debouncedCarNameFilter.toLocaleLowerCase()
      ),
    [cars, debouncedCarNameFilter]
  );

  const cityId = useMemo(
    () =>
      city.find(
        (item) => item.name.toLocaleLowerCase() === debouncedCityFilter.toLocaleLowerCase()
      ),
    [city, debouncedCityFilter]
  );

  const orderStatusId = useMemo(
    () =>
      allOrderStatus.find(
        (orderStatus) =>
          orderStatus.name.toLocaleLowerCase() === debouncedOrderStatusFilter.toLocaleLowerCase()
      ),
    [allOrderStatus, debouncedOrderStatusFilter]
  );

  useEffect(() => {
    const tokenBearer = '5572401adf3610d62586679581bfebc7ff3a0b2f';
    fetchAllOrders(
      tokenBearer,
      limit,
      currentPage,
      carNameId ? carNameId.id : null,
      cityId ? cityId.id : null,
      orderStatusId ? orderStatusId.id : null,
      debouncedCarColorFilter || null
    );
  }, [limit, currentPage]);

  // Фильтрация выводимой подсказки в autocomplete
  const filterOption = useCallback<FilterOptionType>(
    (inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
    []
  );

  // Обработчики ввода данных в поля фильтрации
  const carNameFilterHandler = useCallback(
    (value: string) => {
      setCarNameFilter(value);
    },
    [carNameFilter]
  );

  const cityFilterHandler = useCallback(
    (value: string) => {
      setCityFilter(value);
    },
    [cityFilter]
  );

  const orderStatusFilterHandler = useCallback(
    (value: string) => {
      setOrderStatusFilter(value);
    },
    [orderStatusFilter]
  );

  const carColorFilterHandler = useCallback(
    (value: string) => {
      setCarColorFilter(value);
    },
    [carColorFilter]
  );

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setCarNameFilter('');
    setCityFilter('');
    setOrderStatusFilter('');
    setCarColorFilter('');
    const tokenBearer = '5c8f8c2958782851fb34b572bdb3751643676f11';
    fetchAllOrders(
      tokenBearer,
      limit,
      currentPage,
      carNameId ? carNameId.id : null,
      cityId ? cityId.id : null,
      orderStatusId ? orderStatusId.id : null,
      debouncedCarColorFilter || null
    );
    setCurrentPage(1);
  }, []);

  // Обработчик кнопки применения фильтрации
  const filterApplyHandler = useCallback(() => {
    const tokenBearer = '5c8f8c2958782851fb34b572bdb3751643676f11';
    fetchAllOrders(
      tokenBearer,
      limit,
      currentPage,
      carNameId ? carNameId.id : null,
      cityId ? cityId.id : null,
      orderStatusId ? orderStatusId.id : null,
      debouncedCarColorFilter || null
    );
    setCurrentPage(1);
  }, [carNameId, cityId, orderStatusId, debouncedCarColorFilter]);

  return (
    <div className={styles.AdminOrderListFilteres}>
      <Row className={styles.filters}>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          {carsIsLoading ? (
            <ErrorLoading
              loading={carsIsLoading}
              error={carsError}
              isLarge
              errorClassName={styles.errorTxt}
            />
          ) : (
            <AdminAutocomplete
              options={optionsCarsName}
              filterOption={filterOption}
              value={carNameFilter}
              onChange={carNameFilterHandler}
              placeholder="Название"
              className={styles.autocomplete}
              inputClassName={styles.input}
            />
          )}
        </Col>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          {cityIsLoading ? (
            <ErrorLoading
              loading={cityIsLoading}
              error={cityError}
              isLarge
              errorClassName={styles.errorTxt}
            />
          ) : (
            <AdminAutocomplete
              options={optionsCityName}
              filterOption={filterOption}
              value={cityFilter}
              onChange={cityFilterHandler}
              placeholder="Город"
              className={styles.autocomplete}
              inputClassName={styles.input}
            />
          )}
        </Col>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          {orderStatusIsLoading ? (
            <ErrorLoading
              loading={orderStatusIsLoading}
              error={orderStatusError}
              isLarge
              errorClassName={styles.errorTxt}
            />
          ) : (
            <AdminAutocomplete
              options={optionsOrderStatus}
              filterOption={filterOption}
              value={orderStatusFilter}
              onChange={orderStatusFilterHandler}
              placeholder="Статус"
              className={styles.autocomplete}
              inputClassName={styles.input}
            />
          )}
        </Col>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          {carsIsLoading ? (
            <ErrorLoading
              loading={carsIsLoading}
              error={carsError}
              isLarge
              errorClassName={styles.errorTxt}
            />
          ) : (
            <AdminAutocomplete
              options={optionsCarColors}
              filterOption={filterOption}
              value={carColorFilter}
              onChange={carColorFilterHandler}
              placeholder="Цвет"
              className={styles.autocomplete}
              inputClassName={styles.input}
            />
          )}
        </Col>
        <Col xxl={12} xl={16} lg={8} md={8} sm={24} xs={24} className={styles.applyBtnContainer}>
          <AdminBtn
            onClick={filterResetHandler}
            color="red"
            className={styles.resetBtn}
            containerClassName={styles.btn}
          >
            Сбросить
          </AdminBtn>
          <AdminBtn
            onClick={filterApplyHandler}
            className={styles.applyBtn}
            containerClassName={styles.btn}
          >
            Применить
          </AdminBtn>
        </Col>
      </Row>
    </div>
  );
};
