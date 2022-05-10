import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { citySelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import styles from './styles.module.less';
import { FilterOptionType, IAdminCityListFilters } from './type';

export const AdminCityListFilters: FC<IAdminCityListFilters> = ({
  setCurrentPage,
  setFilteredCity,
}) => {
  const { city, cityIsLoading } = useTypedSelector(citySelector);
  const [cityNameFilter, setCityNameFilter] = useState('');
  const debouncedCityNameFilter = useDebounce<string>(cityNameFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedCityNameFilter]);

  // Создаю массив для поля фильтрации
  const cityName = useMemo(() => city.map((item) => (item.name ? item.name : '')), [city]);

  // Удаляю все дубли и null из массива
  const cleanCityName = useMemo(
    () =>
      cityName.filter(
        (item, index) => cityName.indexOf(item) === index && item !== null && item !== ''
      ),
    [cityName]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCityName = useMemo(() => {
    return cleanCityName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanCityName]);

  // Обработчики ввода данных в поля фильтрации
  const cityNameFilterHandler = useCallback(
    (value) => {
      setCityNameFilter(value);
    },
    [cityNameFilter]
  );

  // Фильтрация выводимой подсказки в autocomplete
  const filterOption = useCallback<FilterOptionType>(
    (inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
    []
  );

  // Отфильтровываю города
  const filteredCity = useMemo(() => {
    if (debouncedCityNameFilter)
      return city.filter((item) =>
        item.name ? item.name === debouncedCityNameFilter : item.name !== null
      );
    return city;
  }, [city, debouncedCityNameFilter]);

  useEffect(() => {
    setFilteredCity(filteredCity);
  }, [filteredCity]);

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setCityNameFilter('');
    setCurrentPage(1);
  }, []);

  const addCityHandler = useCallback(() => {
    alert('Добавить город');
  }, []);

  return (
    <div className={styles.AdminCityListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={5} sm={24} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCityName}
            filterOption={filterOption}
            value={cityNameFilter}
            onChange={cityNameFilterHandler}
            placeholder="Название"
            isLoading={cityIsLoading}
            className={styles.autocomplete}
            inputClassName={styles.input}
          />
        </Col>
        <Col xxl={21} xl={22} lg={20} md={19} sm={24} xs={24} className={styles.btnContainer}>
          <AdminBtn
            onClick={filterResetHandler}
            type="red"
            className={styles.resetBtn}
            containerClassName={styles.resetBtnContainer}
          >
            Сбросить фильтр
          </AdminBtn>
          <AdminBtn
            onClick={addCityHandler}
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
