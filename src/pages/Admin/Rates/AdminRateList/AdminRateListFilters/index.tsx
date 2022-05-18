import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesSelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import styles from './styles.module.less';
import { IAdminRateListFilters } from './type';

export const AdminRateListFilters: FC<IAdminRateListFilters> = ({
  setCurrentPage,
  setFilteredRates,
}) => {
  const { rates, ratesIsLoading } = useTypedSelector(ratesSelector);
  const [rateNameFilter, setRateNameFilter] = useState('');
  const debouncedRateNameFilter = useDebounce<string>(rateNameFilter, 500);
  const [ratePriceFilter, setRatePriceFilter] = useState('');
  const debouncedRatePriceFilter = useDebounce<string>(ratePriceFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedRateNameFilter, debouncedRatePriceFilter]);

  // Создаю массив для поля фильтрации
  const rateName = useMemo(
    () => rates.map((item) => (item.rateTypeId ? item.rateTypeId.name : '')),
    [rates]
  );
  const ratePrice = useMemo(() => rates.map((item) => (item.price ? item.price : null)), [rates]);

  // Удаляю все дубли и null из массива
  const cleanRateName = useMemo(
    () =>
      rateName.filter(
        (item, index) => rateName.indexOf(item) === index && item !== null && item !== ''
      ),
    [rateName]
  );

  const cleanRatePrice = useMemo(
    () => ratePrice.filter((item, index) => ratePrice.indexOf(item) === index && item !== null),
    [ratePrice]
  );

  const stringCleanRatePrice = useMemo(() => cleanRatePrice.map(String), [cleanRatePrice]);

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsRateName = useMemo(() => {
    return cleanRateName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanRateName]);

  const optionsRatePrice = useMemo(() => {
    return stringCleanRatePrice.map((price: string) => {
      return {
        value: price,
      };
    });
  }, [stringCleanRatePrice]);

  // Обработчики ввода данных в поля фильтрации
  const rateNameFilterHandler = useCallback(
    (value) => {
      setRateNameFilter(value);
    },
    [rateNameFilter]
  );

  const ratePriceFilterHandler = useCallback(
    (value) => {
      setRatePriceFilter(value);
    },
    [ratePriceFilter]
  );

  // Отфильтровываю тарифы
  const filteredRates = useMemo(() => {
    if (debouncedRateNameFilter && debouncedRatePriceFilter)
      return rates.filter(
        (rate) =>
          (rate.rateTypeId
            ? rate.rateTypeId.name === debouncedRateNameFilter
            : rate.rateTypeId !== null) &&
          (rate.price ? rate.price.toString() === debouncedRatePriceFilter : rate.price !== null)
      );
    if (debouncedRateNameFilter || debouncedRatePriceFilter)
      return rates.filter(
        (rate) =>
          (rate.rateTypeId
            ? rate.rateTypeId.name === debouncedRateNameFilter
            : rate.rateTypeId !== null) ||
          (rate.price ? rate.price.toString() === debouncedRatePriceFilter : rate.price !== null)
      );
    return rates;
  }, [rates, debouncedRateNameFilter, debouncedRatePriceFilter]);

  useEffect(() => {
    setFilteredRates(filteredRates);
  }, [filteredRates]);

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setRateNameFilter('');
    setRatePriceFilter('');
    setCurrentPage(1);
  }, []);

  const addPointHandler = useCallback(() => {
    alert('Добавить пункт выдачи');
  }, []);

  return (
    <div className={styles.AdminRateListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsRateName}
            value={rateNameFilter}
            onChange={rateNameFilterHandler}
            placeholder="Название"
            isLoading={ratesIsLoading}
            className={styles.autocomplete}
            inputClassName={styles.input}
          />
        </Col>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsRatePrice}
            value={ratePriceFilter}
            onChange={ratePriceFilterHandler}
            placeholder="Цена"
            isLoading={ratesIsLoading}
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
