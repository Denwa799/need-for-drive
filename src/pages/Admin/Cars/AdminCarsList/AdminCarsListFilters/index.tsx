import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import styles from './styles.module.less';
import { IAdminCarsListFilters } from './type';

export const AdminCarsListFilters: FC<IAdminCarsListFilters> = ({
  setCurrentPage,
  setFilteredCars,
}) => {
  const { cars, carsIsLoading } = useTypedSelector(carsSelector);
  const navigate = useNavigate();
  const [carNameFilter, setCarNameFilter] = useState('');
  const debouncedCarNameFilter = useDebounce<string>(carNameFilter, 500);
  const [carCategoryNameFilter, setCarCategoryNameFilter] = useState('');
  const debouncedCarCategoryNameFilter = useDebounce<string>(carCategoryNameFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedCarNameFilter, debouncedCarCategoryNameFilter]);

  // Создаю массив для поля фильтрации
  const carsName = useMemo(() => cars.map((car) => (car.name ? car.name : '')), [cars]);
  const carsCategory = useMemo(
    () => cars.map((car) => (car.categoryId ? car.categoryId.name : '')),
    [cars]
  );

  // Удаляю все дубли и null из массива
  const cleanCarsName = useMemo(
    () =>
      carsName.filter(
        (item, index) => carsName.indexOf(item) === index && item !== null && item !== ''
      ),
    [carsName]
  );

  const cleanCarsCategory = useMemo(
    () =>
      carsCategory.filter(
        (item, index) => carsCategory.indexOf(item) === index && item !== null && item !== ''
      ),
    [carsCategory]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCarsName = useMemo(() => {
    return cleanCarsName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanCarsName]);

  const optionsCarsCategory = useMemo(() => {
    return cleanCarsCategory.map((category) => {
      return {
        value: category,
      };
    });
  }, [cleanCarsCategory]);

  // Обработчики ввода данных в поля фильтрации
  const carNameFilterHandler = useCallback(
    (value) => {
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

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setCarNameFilter('');
    setCarCategoryNameFilter('');
    setCurrentPage(1);
  }, []);

  const addCarHandler = useCallback(() => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CAR}`);
  }, []);

  // Отфильтровываю машины
  const filteredCars = useMemo(() => {
    if (debouncedCarNameFilter && debouncedCarCategoryNameFilter)
      return cars.filter(
        (car) =>
          (car.name ? car.name === debouncedCarNameFilter : car.name !== null) &&
          (car.categoryId
            ? car.categoryId.name === debouncedCarCategoryNameFilter
            : car.categoryId !== null)
      );
    if (debouncedCarNameFilter || debouncedCarCategoryNameFilter)
      return cars.filter(
        (car) =>
          (car.name ? car.name === debouncedCarNameFilter : car.name !== null) ||
          (car.categoryId
            ? car.categoryId.name === debouncedCarCategoryNameFilter
            : car.categoryId !== null)
      );
    return cars;
  }, [cars, debouncedCarNameFilter, debouncedCarCategoryNameFilter]);

  useEffect(() => {
    setFilteredCars(filteredCars);
  }, [filteredCars]);

  return (
    <div className={styles.AdminCarsListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCarsName}
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
            type="red"
            className={styles.resetBtn}
            containerClassName={styles.resetBtnContainer}
          >
            Сбросить фильтр
          </AdminBtn>
          <AdminBtn
            onClick={addCarHandler}
            className={styles.addBtn}
            containerClassName={styles.addBtnContainer}
          >
            Добавить
          </AdminBtn>
        </Col>
      </AdminFiltersContainer>
    </div>
  );
};
