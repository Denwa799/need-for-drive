import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesTypeSelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import { RouteNames } from 'router/routes';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.less';
import { IAdminRateTypeListFilters } from './type';

export const AdminRateTypeListFilters: FC<IAdminRateTypeListFilters> = ({
  setCurrentPage,
  setFilteredRatesType,
}) => {
  const navigate = useNavigate();
  const { ratesType, ratesTypeIsLoading } = useTypedSelector(ratesTypeSelector);
  const [rateTypeNameFilter, setRateTypeNameFilter] = useState('');
  const debouncedRateTypeNameFilter = useDebounce<string>(rateTypeNameFilter, 500);
  const [rateTypeUnitFilter, setRateTypeUnitFilter] = useState('');
  const debouncedRateTypeUnitFilter = useDebounce<string>(rateTypeUnitFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedRateTypeNameFilter, debouncedRateTypeUnitFilter]);

  // Создаю массив для поля фильтрации
  const rateTypeNames = useMemo(
    () => ratesType.map((item) => (item.name ? item.name : '')),
    [ratesType]
  );
  const rateTypeUnits = useMemo(
    () => ratesType.map((item) => (item.unit ? item.unit : '')),
    [ratesType]
  );

  // Удаляю все дубли и null из массива
  const cleanRateTypeNames = useMemo(
    () =>
      rateTypeNames.filter(
        (item, index) => rateTypeNames.indexOf(item) === index && item !== null && item !== ''
      ),
    [rateTypeNames]
  );

  const cleanRateTypesUnits = useMemo(
    () =>
      rateTypeUnits.filter(
        (item, index) => rateTypeUnits.indexOf(item) === index && item !== null && item !== ''
      ),
    [rateTypeUnits]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsRateTypeName = useMemo(() => {
    return cleanRateTypeNames.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanRateTypeNames]);

  const optionsRateTypeUnit = useMemo(() => {
    return cleanRateTypesUnits.map((unit: string) => {
      return {
        value: unit,
      };
    });
  }, [cleanRateTypesUnits]);

  // Обработчики ввода данных в поля фильтрации
  const rateTypeNameFilterHandler = useCallback(
    (value) => {
      setRateTypeNameFilter(value);
    },
    [rateTypeNameFilter]
  );

  const rateTypeUnitFilterHandler = useCallback(
    (value) => {
      setRateTypeUnitFilter(value);
    },
    [rateTypeUnitFilter]
  );

  // Отфильтровываю типы тарифов
  const filteredRatesType = useMemo(() => {
    if (debouncedRateTypeNameFilter || debouncedRateTypeUnitFilter) {
      return ratesType.filter((type) => {
        const nameFiltered = type.name
          ? type.name === debouncedRateTypeNameFilter
          : type.name !== null;

        const unitFiltered = type.unit
          ? type.unit === debouncedRateTypeUnitFilter
          : type.unit !== null;

        if (debouncedRateTypeNameFilter && debouncedRateTypeUnitFilter)
          return nameFiltered && unitFiltered;

        return nameFiltered || unitFiltered;
      });
    }
    return ratesType;
  }, [ratesType, debouncedRateTypeNameFilter, debouncedRateTypeUnitFilter]);

  useEffect(() => {
    setFilteredRatesType(filteredRatesType);
  }, [filteredRatesType]);

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setRateTypeNameFilter('');
    setRateTypeUnitFilter('');
    setCurrentPage(1);
  }, []);

  const addPointHandler = useCallback(() => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_TYPE}`);
  }, []);

  return (
    <div className={styles.AdminRateTypeListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsRateTypeName}
            value={rateTypeNameFilter}
            onChange={rateTypeNameFilterHandler}
            placeholder="Название"
            isLoading={ratesTypeIsLoading}
            className={styles.autocomplete}
            inputClassName={styles.input}
          />
        </Col>
        <Col xxl={3} xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsRateTypeUnit}
            value={rateTypeUnitFilter}
            onChange={rateTypeUnitFilterHandler}
            placeholder="Единица измерения"
            isLoading={ratesTypeIsLoading}
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
