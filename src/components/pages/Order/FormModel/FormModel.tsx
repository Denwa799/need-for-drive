import React, { FC, useState } from 'react';
import { Affix, Col, Pagination, Radio, Row, Typography } from 'antd';
import cn from 'classnames';
import styles from './FormModel.module.less';

import car1 from '../../../../assets/img/cars/image-1.webp';
import { CarMock } from './CarMock';
import { ICarModel } from './type';

const { Title, Text } = Typography;

const FormModel: FC = () => {
  // Фейковый массив объектов с машинами
  const cars = CarMock;

  // Локальный стейт для фильтрации в radio button
  const [filterValue, setFilterValue] = useState('Все');

  // Локальный стейт для реализации пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(4);

  // Обработчик нажатия на radio button
  const onChangeHandler = (e: any) => {
    // Стоит any, так как сюда приходит событие и value из компоненты radio библиотеки ant design
    setFilterValue(e.target.value);
  };

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = (pageNumber: number, pageSize: number) => {
    setCurrentPage(pageNumber);
    setCarsPerPage(pageSize);
  };

  // Отфильтровываю машины
  let filteredCars: ICarModel[];
  if (filterValue !== 'Все') {
    filteredCars = cars.filter((car) => {
      return car.categoryId.name === filterValue;
    });
  } else {
    filteredCars = cars;
  }

  // Переменные для реализации пагинации
  const lastCarIndex = currentPage * carsPerPage;
  const firstCarIndex = lastCarIndex - carsPerPage;
  const paginationCars = filteredCars.slice(firstCarIndex, lastCarIndex);

  function renderPagination() {
    if (window.innerWidth <= 991) {
      return (
        <Row className={styles.Pagination}>
          <Col span={24}>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={4}
              size="small"
              responsive={false}
              total={filteredCars.length}
              showSizeChanger
              onChange={pageChangeHandler}
              pageSizeOptions={['2', '4', '6', '8']}
            />
          </Col>
        </Row>
      );
    }
    return null;
  }

  // При экране меньше 991 - отрисовываю машины с пагинацией
  // При экране больше 991 - отрисовываю машины без пагинации
  function renderCars() {
    if (window.innerWidth <= 991) {
      return paginationCars.map((car) => {
        return (
          <Col xl={12} lg={24} md={12} sm={12} xs={24} className={styles.card}>
            <div className={styles.cardTitleContainer}>
              <Title level={5} className={styles.cardTitle}>
                {car.name}
              </Title>
              <Text className={styles.cardText}>
                {car.priceMin} - {car.priceMax} ₽
              </Text>
            </div>
            <div className={styles.imgContainer}>
              <img src={car1} alt="car" className={styles.img} />
            </div>
          </Col>
        );
      });
    }
    return filteredCars.map((car) => {
      return (
        <Col xl={12} lg={24} md={12} sm={12} xs={24} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              {car.name}
            </Title>
            <Text className={styles.cardText}>
              {car.priceMin} - {car.priceMax} ₽
            </Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car1} alt="car" className={styles.img} />
          </div>
        </Col>
      );
    });
  }

  return (
    <div className={styles.FormModel}>
      <Affix offsetTop={135}>
        <div className={styles.radioBtnsAffix}>
          <Radio.Group onChange={onChangeHandler} value={filterValue} className={styles.RadioGroup}>
            <Radio
              value="Все"
              className={cn(styles.Radio, { [styles.RadioActive]: filterValue === 'Все' })}
            >
              Все модели
            </Radio>
            <Radio
              value="Эконом"
              className={cn(styles.Radio, { [styles.RadioActive]: filterValue === 'Эконом' })}
            >
              Эконом
            </Radio>
            <Radio
              value="Премиум"
              className={cn(styles.Radio, { [styles.RadioActive]: filterValue === 'Премиум' })}
            >
              Премиум
            </Radio>
          </Radio.Group>
        </div>
      </Affix>
      <Row className={styles.cards}>{renderCars()}</Row>
      {renderPagination()}
    </div>
  );
};

export default FormModel;
