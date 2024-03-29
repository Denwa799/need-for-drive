import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import {
  carsSelector,
  citySelector,
  orderSelector,
  orderStatusSelector,
} from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import useDebounce from 'hooks/useDebounce';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { useCookies } from 'react-cookie';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import styles from './styles.module.less';
import { FilterOptionType, IAdminOrderListFilters } from './type';

export const AdminOrderListFilters: FC<IAdminOrderListFilters> = ({
  limit,
  currentPage,
  setCurrentPage,
}) => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const { orderIsCreate } = useTypedSelector(orderSelector);
  const { cars, carsIsLoading } = useTypedSelector(carsSelector);
  const { cities, citiesIsLoading } = useTypedSelector(citySelector);
  const { allOrderStatus, orderStatusIsLoading } = useTypedSelector(orderStatusSelector);

  const [carNameFilter, setCarNameFilter] = useState('');
  const debouncedCarNameFilter = useDebounce<string>(carNameFilter, 500);

  const [cityFilter, setCityFilter] = useState('');
  const debouncedCityFilter = useDebounce<string>(cityFilter, 500);

  const [orderStatusFilter, setOrderStatusFilter] = useState('');
  const debouncedOrderStatusFilter = useDebounce<string>(orderStatusFilter, 500);

  const [carColorFilter, setCarColorFilter] = useState('');
  const debouncedCarColorFilter = useDebounce<string>(carColorFilter, 500);

  const { fetchAllOrders, fetchCars, fetchCities, fetchAllOrderStatus, setOrderIsCreate } =
    useActions();

  useEffect(() => {
    if (!carsIsLoading) fetchCars();
    if (!citiesIsLoading) fetchCities();
    if (!orderStatusIsLoading) fetchAllOrderStatus();
  }, []);

  // Создаю массив для поля фильтрации
  const carsName = useMemo(() => cars.map((car) => car.name), [cars]);
  const cityName = useMemo(() => cities.map((item) => item.name), [cities]);
  const orderStatusName = useMemo(
    () => allOrderStatus.map((order) => order.name),
    [allOrderStatus]
  );
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

  const cleanCityName = useMemo(
    () => cityName.filter((item, index) => cityName.indexOf(item) === index),
    [cityName]
  );

  const cleanOrderStatusName = useMemo(
    () => orderStatusName.filter((item, index) => orderStatusName.indexOf(item) === index),
    [orderStatusName]
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
    return cleanCityName.map((name) => {
      return {
        value: name,
      };
    });
  }, [cities]);

  const optionsOrderStatus = useMemo(() => {
    return cleanOrderStatusName.map((name) => {
      return {
        value: name,
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
      cities.find(
        (item) => item.name.toLocaleLowerCase() === debouncedCityFilter.toLocaleLowerCase()
      ),
    [cities, debouncedCityFilter]
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

  // Если заказ был обновлен
  useEffect(() => {
    if (orderIsCreate)
      setTimeout(() => {
        setOrderIsCreate(false);
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
      }, 3000);
  }, [orderIsCreate]);

  return (
    <div className={styles.AdminOrderListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCarsName}
            filterOption={filterOption}
            value={carNameFilter}
            onChange={carNameFilterHandler}
            placeholder="Название"
            className={styles.autocomplete}
            inputClassName={styles.input}
            isLoading={carsIsLoading}
          />
        </Col>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCityName}
            filterOption={filterOption}
            value={cityFilter}
            onChange={cityFilterHandler}
            placeholder="Город"
            className={styles.autocomplete}
            inputClassName={styles.input}
            isLoading={citiesIsLoading}
          />
        </Col>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsOrderStatus}
            filterOption={filterOption}
            value={orderStatusFilter}
            onChange={orderStatusFilterHandler}
            placeholder="Статус"
            className={styles.autocomplete}
            inputClassName={styles.input}
            isLoading={orderStatusIsLoading}
          />
        </Col>
        <Col xxl={3} xl={2} lg={4} md={4} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCarColors}
            filterOption={filterOption}
            value={carColorFilter}
            onChange={carColorFilterHandler}
            placeholder="Цвет"
            className={styles.autocomplete}
            inputClassName={styles.input}
            isLoading={carsIsLoading}
          />
        </Col>
        <Col xxl={12} xl={16} lg={8} md={8} sm={24} xs={24} className={styles.applyBtnContainer}>
          <AdminBtn
            onClick={filterResetHandler}
            type="red"
            className={styles.resetBtn}
            containerClassName={styles.btn}
            disabled={orderIsCreate}
          >
            Сбросить
          </AdminBtn>
          <AdminBtn
            onClick={filterApplyHandler}
            className={styles.applyBtn}
            containerClassName={styles.btn}
            disabled={orderIsCreate}
          >
            Применить
          </AdminBtn>
        </Col>
      </AdminFiltersContainer>
    </div>
  );
};
