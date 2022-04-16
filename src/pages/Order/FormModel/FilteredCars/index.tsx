import React, { FC, SyntheticEvent, useCallback } from 'react';
import { Col, Typography } from 'antd';
import cn from 'classnames';
import defaultImg from 'assets/img/cars/image-1.webp';
import styles from './styles.module.less';
import { IFilteredCars } from './type';

const { Title, Text } = Typography;

const FilteredCars: FC<IFilteredCars> = ({ activeCarId, paginationCars, carClickHandler }) => {
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImg;
  }, []);

  return (
    <>
      {paginationCars.map((car) => {
        return (
          <Col
            key={car.id}
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className={styles.cardContainer}
          >
            <button
              type="button"
              className={cn(styles.card, { [styles.cardActive]: car.id === activeCarId })}
              onClick={() => carClickHandler(car.id, car.name, car.priceMin, car.priceMax)}
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
                <img
                  src={car.thumbnail.path}
                  alt={car.name}
                  onError={imageOnErrorHandler}
                  className={styles.img}
                />
              </div>
            </button>
          </Col>
        );
      })}
    </>
  );
};

export default React.memo(FilteredCars);
