import React, { FC, useCallback, useMemo, useState } from 'react';
import { Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import styles from './FormModel.module.less';

import { carsMock as cars } from './carsMock';
import { IFormModel, carClickHandlerType, pageChangeHandlerType } from './type';
import { RenderPagination } from './RenderPagination';
import RenderCars from './RenderCars';
import { AppRadio } from '../../../ui/AppRadio';

const FormModel: FC<IFormModel> = ({
  activeCarId,
  setActiveCarId,
  activeCar,
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
  const carClickHandler: carClickHandlerType = useCallback(
    (id, name, min, max) => {
      setActiveCarId(id);
      setActiveCar(name);
      setPriceMin(min);
      setPriceMax(max);
    },
    [activeCarId]
  );

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler: pageChangeHandlerType = useCallback(
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

  // Отфилтрованный массив, исходя из пагинации
  const paginationCars = useMemo(() => {
    return filteredCars.slice(firstCarIndex, lastCarIndex);
  }, [firstCarIndex, lastCarIndex, filterValue]);

  return (
    <div className={styles.FormModel}>
      <div className={styles.radioBtnsAffix}>
        <AppRadio onChange={filterChangeHandler} filterValue={filterValue} />
      </div>
      <Row className={styles.cards}>
        <RenderCars
          activeCarId={activeCarId}
          paginationCars={paginationCars}
          filteredCars={filteredCars}
          carClickHandler={carClickHandler}
        />
      </Row>
      <RenderPagination
        onChange={pageChangeHandler}
        total={filteredCars.length}
        pageSizeOptions={pageSizeOptions}
        page={currentPage}
      />
    </div>
  );
};

export default FormModel;
