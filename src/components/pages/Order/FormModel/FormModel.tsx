import React, { FC, useState } from 'react';
import { Affix, Col, Radio, Row, Typography } from 'antd';
import cn from 'classnames';
import styles from './FormModel.module.less';

import car1 from '../../../../assets/img/cars/image-1.webp';
import { CarMock } from './CarMock';

const { Title, Text } = Typography;

const FormModel: FC = () => {
  // Фейковый массив объектов с машинами
  const cars = CarMock;

  // Стейт для фильтрации в radio button
  const [filterValue, setFilterValue] = useState('Все');

  // Обработчик нажатия на radio button
  const onChangeHandler = (e: any) => {
    // Стоит any, так как сюда приходит событие и value из компоненты radio библиотеки ant design
    setFilterValue(e.target.value);
  };

  // Отфильтровываю машины
  let filteredCars;
  if (filterValue !== 'Все') {
    filteredCars = cars.filter((car) => {
      return car.categoryId.name === filterValue;
    });
  } else {
    filteredCars = cars;
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

      <Row className={styles.cards}>
        {filteredCars.map((car) => {
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
        })}
      </Row>
    </div>
  );
};

export default FormModel;
