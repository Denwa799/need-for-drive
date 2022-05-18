import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { categoriesSelector } from 'store/selectors/selectors';
import useDebounce from 'hooks/useDebounce';
import { Col } from 'antd';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import styles from './styles.module.less';
import { IAdminCategoryListFilters } from './type';

export const AdminCategoryListFilters: FC<IAdminCategoryListFilters> = ({
  setCurrentPage,
  setFilteredCategories,
}) => {
  const { categories, categoriesIsLoading } = useTypedSelector(categoriesSelector);
  const [categoriesNameFilter, setCategoriesNameFilter] = useState('');
  const debouncedCategoriesNameFilter = useDebounce<string>(categoriesNameFilter, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedCategoriesNameFilter]);

  // Создаю массив для поля фильтрации
  const categoriesName = useMemo(
    () => categories.map((item) => (item.name ? item.name : '')),
    [categories]
  );

  // Удаляю все дубли и null из массива
  const cleanCategoriesName = useMemo(
    () =>
      categoriesName.filter(
        (item, index) => categoriesName.indexOf(item) === index && item !== null && item !== ''
      ),
    [categoriesName]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCategoriesName = useMemo(() => {
    return cleanCategoriesName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanCategoriesName]);

  // Обработчики ввода данных в поля фильтрации
  const categoriesNameFilterHandler = useCallback(
    (value) => {
      setCategoriesNameFilter(value);
    },
    [categoriesNameFilter]
  );

  // Отфильтровываю категории
  const filteredCategories = useMemo(() => {
    if (debouncedCategoriesNameFilter)
      return categories.filter((item) =>
        item.name ? item.name === debouncedCategoriesNameFilter : item.name !== null
      );
    return categories;
  }, [categories, debouncedCategoriesNameFilter]);

  useEffect(() => {
    setFilteredCategories(filteredCategories);
  }, [filteredCategories]);

  // Обработчик кнопки сброса полей фильтрации
  const filterResetHandler = useCallback(() => {
    setCategoriesNameFilter('');
    setCurrentPage(1);
  }, []);

  const addCityHandler = useCallback(() => {
    alert('Добавить город');
  }, []);

  return (
    <div className={styles.AdminCategoryListFilters}>
      <AdminFiltersContainer>
        <Col xxl={3} xl={2} lg={4} md={5} sm={24} xs={24} className={styles.filter}>
          <AdminAutocomplete
            options={optionsCategoriesName}
            value={categoriesNameFilter}
            onChange={categoriesNameFilterHandler}
            placeholder="Название"
            isLoading={categoriesIsLoading}
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
