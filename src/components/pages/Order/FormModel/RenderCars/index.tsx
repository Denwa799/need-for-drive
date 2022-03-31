import React, { FC } from 'react';
import { Col, Typography } from 'antd';
import styles from '../FormModel.module.less';
import car1 from '../../../../../assets/img/cars/image-1.webp';
import { IRenderCars } from './type';

const { Title, Text } = Typography;

const RenderCars: FC<IRenderCars> = ({ paginationCars, filteredCars, carClickHandler }) => {
  // При экране меньше 991 - отрисовываю машины с пагинацией
  // При экране больше 991 - отрисовываю машины без пагинации

  if (window.innerWidth <= 991) {
    return (
      <>
        {paginationCars.map((car) => {
          return (
            <Col key={car.id} xl={12} lg={24} md={12} sm={12} xs={24}>
              <button
                type="button"
                className={styles.card}
                onClick={() => carClickHandler(car.name, car.priceMin, car.priceMax)}
              >
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
              </button>
            </Col>
          );
        })}
      </>
    );
  }
  return (
    <>
      {filteredCars.map((car) => {
        return (
          <Col key={car.id} xl={12} lg={24} md={12} sm={12} xs={24}>
            <button
              type="button"
              className={styles.card}
              onClick={() => carClickHandler(car.name, car.priceMin, car.priceMax)}
            >
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
            </button>
          </Col>
        );
      })}
    </>
  );
};

export default React.memo(RenderCars);
