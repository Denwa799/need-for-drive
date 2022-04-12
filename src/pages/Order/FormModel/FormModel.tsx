import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { AppRadioGroup } from 'components/ui/AppRadioGroup';
import { AppPagination } from 'components/ui/AppPagination';
import { AppRadioBtn } from 'components/ui/AppRadioBtn';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { useActions } from 'hooks/useActions';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { carsSelector, categoriesSelector } from 'store/selectors/selectors';
import styles from './FormModel.module.less';
import { IFormModel, CarClickHandlerType, PageChangeHandlerType } from './type';
import FilteredCars from './FilteredCars';

const FormModel: FC<IFormModel> = ({
  activeCarId,
  setActiveCarId,
  setActiveCar,
  setSelectedCar,
  setPriceMin,
  setPriceMax,
  pageSizeOptions,
}) => {
  // Стейт
  const { cars, carsIsLoading, carsError } = useTypedSelector(carsSelector);
  const { categories, categoriesIsLoading, categoriesError } = useTypedSelector(categoriesSelector);

  // Запрос на получение списка машин из api для формы "Модель" (FormModel)
  const { fetchCars } = useActions();
  const { fetchCategories } = useActions();
  useEffect(() => {
    fetchCars();
    fetchCategories();
  }, []);

  // Локальный стейт для реализации пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(4);
  const [filterValue, setFilterValue] = useState('Все модели');

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
    (car, id, name, min, max) => {
      setSelectedCar(car);
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
    if (filterValue !== 'Все модели') {
      return cars.filter((car) => car.categoryId.name === filterValue);
    }
    return cars;
  }, [cars, filterValue]);

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
  }, [filteredCars, firstCarIndex, lastCarIndex, filteredCars]);

  const pageIsLoading = carsIsLoading || carsError || categoriesIsLoading || categoriesError;

  return (
    <div>
      {pageIsLoading ? (
        <ErrorLoading
          loading={carsIsLoading || categoriesIsLoading}
          error={carsError || categoriesError}
        />
      ) : (
        <div className={styles.formModel}>
          <div className={styles.radioButtons}>
            <AppRadioGroup onChange={filterChangeHandler} filterValue={filterValue}>
              <AppRadioBtn value="Все модели" filterValue={filterValue} />
              {categories.map((button) => {
                return (
                  <AppRadioBtn key={button.id} value={button.name} filterValue={filterValue} />
                );
              })}
            </AppRadioGroup>
          </div>
          <Row>
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
      )}
    </div>
  );
};

export default FormModel;
