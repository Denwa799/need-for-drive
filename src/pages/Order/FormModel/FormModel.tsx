import React, { FC, useCallback, useMemo, useState } from 'react';
import { Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { AppRadioBtn } from 'components/ui/AppRadioBtn';
import { AppPagination } from 'components/ui/AppPagination';
import styles from './FormModel.module.less';

import { IFormModel, CarClickHandlerType, PageChangeHandlerType } from './type';
import FilteredCars from './FilteredCars';

const FormModel: FC<IFormModel> = ({
  cars,
  categories,
  activeCarId,
  setActiveCarId,
  setActiveCar,
  setPriceMin,
  setPriceMax,
  filterValue,
  setFilterValue,
  pageSizeOptions,
}) => {
  // Локальный стейт для реализации пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(4);

  // Обработчик нажатия на radio button
  const filterChangeHandler = useCallback(
    (event: RadioChangeEvent) => {
      setFilterValue(event.target.value);
      setCurrentPage(1);
    },
    [filterValue]
  );

  // Обработчик нажатия на карточку с машиной
  const carClickHandler = useCallback<CarClickHandlerType>(
    (id, name, min, max) => {
      setActiveCarId(id);
      setActiveCar(name);
      setPriceMin(min);
      setPriceMax(max);
    },
    [activeCarId]
  );

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setCarsPerPage(pageSize);
    },
    [currentPage, carsPerPage]
  );

  // Отфильтровываю машины
  const filteredCars = useMemo(() => {
    if (filterValue !== 'Все') {
      return cars.filter((car) => car.categoryId.name === filterValue);
    }
    return cars;
  }, [filterValue]);

  // Переменные для реализации пагинации
  const lastCarIndex = useMemo(() => {
    return currentPage * carsPerPage;
  }, [currentPage, carsPerPage]);

  const firstCarIndex = useMemo(() => {
    return lastCarIndex - carsPerPage;
  }, [lastCarIndex, carsPerPage]);

  // Отфильтрованный массив, исходя из пагинации
  const paginationCars = useMemo(() => {
    return filteredCars.slice(firstCarIndex, lastCarIndex);
  }, [firstCarIndex, lastCarIndex, filteredCars]);

  return (
    <div className={styles.formModel}>
      <div className={styles.radioButtons}>
        <AppRadioBtn
          buttons={categories}
          onChange={filterChangeHandler}
          filterValue={filterValue}
          allIsActive
          btnAllText="Все модели"
        />
      </div>
      <Row className={styles.cards}>
        <FilteredCars
          activeCarId={activeCarId}
          paginationCars={paginationCars}
          carClickHandler={carClickHandler}
        />
      </Row>
      <AppPagination
        onChange={pageChangeHandler}
        total={filteredCars.length}
        pageSizeOptions={pageSizeOptions}
        page={currentPage}
      />
    </div>
  );
};

export default FormModel;
