import React, { FC, SyntheticEvent, useCallback, useMemo } from 'react';
import { Col, Row, Typography } from 'antd';
import defaultImg from 'assets/img/cars/image-1.webp';
import { IFormTotal } from './type';
import styles from './styles.module.less';

const { Title, Text } = Typography;

export const FormTotal: FC<IFormTotal> = ({ selectedCar }) => {
  // Вставляет дефолтную картинку, если путь до изображения с ошибкой
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImg;
  }, []);

  const regCarNumber = useMemo(() => {
    // В регулярном выражении ищутся все цифры от 1 символа и более, и затем перед и после них ставится пробел
    const reg = /\d{1,}/g;
    if (selectedCar) {
      return selectedCar.number.replace(reg, ` $& `);
    }
    return '';
  }, [selectedCar]);

  return (
    <div className={styles.formTotal}>
      {selectedCar ? (
        <Row>
          <Col xl={12} lg={24} md={12} sm={12} xs={24}>
            <Title level={4} className={styles.title}>
              {selectedCar.name}
            </Title>
            <Row className={styles.textContainer}>
              <Text className={styles.number}>{regCarNumber}</Text>
            </Row>
            <Row className={styles.textContainer}>
              <Text className={styles.text__light}>
                <b className={styles.text__bold}>Топливо</b> {selectedCar.tank}%
              </Text>
            </Row>
            <Row className={styles.textContainer}>
              <Text className={styles.text__light}>
                <b className={styles.text__bold}>Доступна с</b> 12.06.2019 12:00
              </Text>
            </Row>
          </Col>
          <Col xl={12} lg={24} md={12} sm={12} xs={24} className={styles.imgBlock}>
            <div className={styles.imgContainer}>
              <img
                src={selectedCar.thumbnail.path}
                alt={selectedCar.name}
                onError={imageOnErrorHandler}
                className={styles.img}
              />
            </div>
          </Col>
        </Row>
      ) : (
        <Title level={3}>Машина не выбрана</Title>
      )}
    </div>
  );
};