import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import styles from './styles.module.less';
import { FilterOptionType } from '../type';
import { IAdminCarsListFilteres } from './type';

export const AdminCarsListFilters: FC<IAdminCarsListFilteres> = ({
  setCurrentPage,
  setFilteredCars,
}) => {
  const { cars, carsIsLoading } = useTypedSelector(carsSelector);
  const [carNameFilter, setCarNameFilter] = useState('');
  const debouncedCarNameFilter = useDebounce<string>(carNameFilter, 500);
  const [carCategoryNameFilter, setCarCategoryNameFilter] = useState('');
  const debouncedCarCategoryNameFilter = useDebounce<string>(carCategoryNameFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedCarNameFilter, debouncedCarCategoryNameFilter]);

  // Создаю массив для поля фильтрации
  const carsName = useMemo(() => cars.map((car) => car.name), [cars]);
  const carsCategory = useMemo(() => cars.map((car) => car.categoryId.name), [cars]);

  // Удаляю все дубли из массива
  const cleanCarsName = useMemo(
    () => carsName.filter((item, index) => carsName.indexOf(item) === index),
    [carsName]
  );

  const cleanCarsCategory = useMemo(
    () => carsCategory.filter((item, index) => carsCategory.indexOf(item) === index),
    [carsCategory]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCarsName = useMemo(() => {
    return cleanCarsName.map((name) => {
      return {
        value: name,
      };
    });
  }, [cleanCarsName]);

  const optionsCarsCategory = useMemo(() => {
    return cleanCarsCategory.map((name) => {
      return {
        value: name,
      };
    });
  }, [cleanCarsCategory]);

  // Обработчики ввода данных в поля фильтрации
  const carNameFilterHandler = useCallback(
    (value: string) => {
      setCarNameFilter(value);
    },
    [carNameFilter]
  );

  const carCategoryNameFilterHandler = useCallback(
    (value: string) => {
      setCarCategoryNameFilter(value);
    },
    [carCategoryNameFilter]
  );

  // Фильтрация выводимой подсказки в autocomplete
  const filterOption = useCallback<FilterOptionType>(
    (inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
    []
  );

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setCarNameFilter('');
    setCarCategoryNameFilter('');
    setCurrentPage(1);
  }, []);

  // Отфильтровываю машины
  const filteredCars = useMemo(() => {
    if (debouncedCarNameFilter && debouncedCarCategoryNameFilter)
      return cars.filter(
        (car) =>
          car.name === debouncedCarNameFilter &&
          car.categoryId.name === debouncedCarCategoryNameFilter
      );
    if (debouncedCarNameFilter || debouncedCarCategoryNameFilter)
      return cars.filter(
        (car) =>
          car.name === debouncedCarNameFilter ||
          car.categoryId.name === debouncedCarCategoryNameFilter
      );
    return cars;
  }, [cars, debouncedCarNameFilter, debouncedCarCategoryNameFilter]);

  useEffect(() => {
    setFilteredCars(filteredCars);
  }, [filteredCars]);

  return (
    <div className={styles.AdminCarsListFilters}>
      <Row className={styles.filters}>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCarsName}
            filterOption={filterOption}
            value={carNameFilter}
            onChange={carNameFilterHandler}
            placeholder="Название"
            isLoading={carsIsLoading}
            className={styles.autocomplete}
            inputClassName={styles.input}
          />
        </Col>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCarsCategory}
            filterOption={filterOption}
            value={carCategoryNameFilter}
            onChange={carCategoryNameFilterHandler}
            placeholder="Категория"
            isLoading={carsIsLoading}
            className={styles.autocomplete}
            inputClassName={styles.input}
          />
        </Col>
        <Col xxl={18} xl={20} lg={16} md={14} sm={24} xs={24} className={styles.btnContainer}>
          <AdminBtn
            onClick={filterResetHandler}
            color="red"
            className={styles.resetBtn}
            containerClassName={styles.btn}
          >
            Сбросить
          </AdminBtn>
        </Col>
      </Row>
    </div>
  );
};
