import React, { FC } from 'react';
import { Carousel, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './AppCarousel.module.less';

const { Title, Text } = Typography;

const AppCarousel: FC = () => {
  return (
    <div className={styles.AppCarousel}>
      <button type="button" className={styles.prevArrow}>
        <LeftOutlined />
      </button>
      <Carousel>
        <div className={`${styles.carouselContent} ${styles.carouselImg1}`}>
          <Title level={2} className={styles.text__white}>
            Бесплатная парковка
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white} `}>
            Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а
            также в аэропортах
          </Text>
        </div>
        <div className={`${styles.carouselContent} ${styles.carouselImg2}`}>
          <Title level={2} className={styles.text__white}>
            Страховка
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white} `}>
            Полная страховка страховка автомобиля
          </Text>
        </div>
        <div className={`${styles.carouselContent} ${styles.carouselImg3}`}>
          <Title level={2} className={styles.text__white}>
            Бензин
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white} `}>
            Полный бак на любой заправке города за наш счёт
          </Text>
        </div>
        <div className={`${styles.carouselContent} ${styles.carouselImg4}`}>
          <Title level={2} className={styles.text__white}>
            Обслуживание
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white} `}>
            Автомобиль проходит еженедельное ТО
          </Text>
        </div>
      </Carousel>
      <button type="button" className={styles.nextArrow}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default AppCarousel;
