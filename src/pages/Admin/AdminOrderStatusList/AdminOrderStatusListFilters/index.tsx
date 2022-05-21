import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderStatusSelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import styles from './styles.module.less';
import { IAdminOrderStatusListFilters } from './type';

export const AdminOrderStatusListFilters: FC<IAdminOrderStatusListFilters> = ({
  setCurrentPage,
  setFilteredOrdersStatus,
}) => {
  const { allOrderStatus, orderStatusIsLoading } = useTypedSelector(orderStatusSelector);
  const [ordersStatusNameFilter, setOrdersStatusNameFilter] = useState('');
  const debouncedOrdersStatusNameFilter = useDebounce<string>(ordersStatusNameFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedOrdersStatusNameFilter]);

  // Создаю массив для поля фильтрации
  const ordersStatusName = useMemo(
    () => allOrderStatus.map((item) => (item.name ? item.name : '')),
    [allOrderStatus]
  );

  // Удаляю все дубли и null из массива
  const cleanOrdersStatusName = useMemo(
    () =>
      ordersStatusName.filter(
        (item, index) => ordersStatusName.indexOf(item) === index && item !== null && item !== ''
      ),
    [ordersStatusName]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsOrdersStatusName = useMemo(() => {
    return cleanOrdersStatusName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanOrdersStatusName]);

  // Обработчики ввода данных в поля фильтрации
  const ordersStatusNameFilterHandler = useCallback(
    (value) => {
      setOrdersStatusNameFilter(value);
    },
    [ordersStatusNameFilter]
  );

  // Отфильтровываю статусы заказа
  const filteredOrdersStatus = useMemo(() => {
    if (debouncedOrdersStatusNameFilter)
      return allOrderStatus.filter((status) =>
        status.name ? status.name === debouncedOrdersStatusNameFilter : status.name !== null
      );
    return allOrderStatus;
  }, [allOrderStatus, debouncedOrdersStatusNameFilter]);

  useEffect(() => {
    setFilteredOrdersStatus(filteredOrdersStatus);
  }, [filteredOrdersStatus]);

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setOrdersStatusNameFilter('');
    setCurrentPage(1);
  }, []);

  const addPointHandler = useCallback(() => {
    alert('Добавить пункт выдачи');
  }, []);

  return (
    <div className={styles.AdminPointListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={5} sm={24} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsOrdersStatusName}
            value={ordersStatusNameFilter}
            onChange={ordersStatusNameFilterHandler}
            placeholder="Название"
            isLoading={orderStatusIsLoading}
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
