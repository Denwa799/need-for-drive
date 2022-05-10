import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { mapPointsSelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import styles from './styles.module.less';
import { IAdminPointListFilters } from './type';

export const AdminPointListFilters: FC<IAdminPointListFilters> = ({
  setCurrentPage,
  setFilteredPoints,
}) => {
  const { points, mapPointsIsLoading } = useTypedSelector(mapPointsSelector);
  const [pointNameFilter, setPointNameFilter] = useState('');
  const debouncedPointNameFilter = useDebounce<string>(pointNameFilter, 500);
  const [pointCityFilter, setPointCityFilter] = useState('');
  const debouncedPointCityFilter = useDebounce<string>(pointCityFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedPointNameFilter, debouncedPointCityFilter]);

  // Создаю массив для поля фильтрации
  const pointName = useMemo(() => points.map((item) => (item.name ? item.name : '')), [points]);
  const pointCity = useMemo(
    () => points.map((item) => (item.cityId ? item.cityId.name : '')),
    [points]
  );

  // Удаляю все дубли и null из массива
  const cleanPointName = useMemo(
    () =>
      pointName.filter(
        (item, index) => pointName.indexOf(item) === index && item !== null && item !== ''
      ),
    [pointName]
  );

  const cleanPointCity = useMemo(
    () =>
      pointCity.filter(
        (item, index) => pointCity.indexOf(item) === index && item !== null && item !== ''
      ),
    [pointCity]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsPointName = useMemo(() => {
    return cleanPointName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanPointName]);

  const optionsPointCity = useMemo(() => {
    return cleanPointCity.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanPointCity]);

  // Обработчики ввода данных в поля фильтрации
  const pointNameFilterHandler = useCallback(
    (value) => {
      setPointNameFilter(value);
    },
    [pointNameFilter]
  );

  const pointCityFilterHandler = useCallback(
    (value) => {
      setPointCityFilter(value);
    },
    [pointCityFilter]
  );

  // Отфильтровываю пункты
  const filteredPoints = useMemo(() => {
    if (debouncedPointNameFilter && debouncedPointCityFilter)
      return points.filter(
        (point) =>
          (point.name ? point.name === debouncedPointNameFilter : point.name !== null) &&
          (point.cityId ? point.cityId.name === debouncedPointCityFilter : point.cityId !== null)
      );
    if (debouncedPointNameFilter || debouncedPointCityFilter)
      return points.filter(
        (point) =>
          (point.name ? point.name === debouncedPointNameFilter : point.name !== null) ||
          (point.cityId ? point.cityId.name === debouncedPointCityFilter : point.cityId !== null)
      );
    return points;
  }, [points, debouncedPointNameFilter, debouncedPointCityFilter]);

  useEffect(() => {
    setFilteredPoints(filteredPoints);
  }, [filteredPoints]);

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setPointNameFilter('');
    setPointCityFilter('');
    setCurrentPage(1);
  }, []);

  const addPointHandler = useCallback(() => {
    alert('Добавить пункт выдачи');
  }, []);

  return (
    <div className={styles.AdminPointListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsPointName}
            value={pointNameFilter}
            onChange={pointNameFilterHandler}
            placeholder="Название"
            isLoading={mapPointsIsLoading}
            className={styles.autocomplete}
            inputClassName={styles.input}
          />
        </Col>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsPointCity}
            value={pointCityFilter}
            onChange={pointCityFilterHandler}
            placeholder="Город"
            isLoading={mapPointsIsLoading}
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
            onClick={addPointHandler}
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
