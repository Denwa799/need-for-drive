import React, { FC, useRef } from 'react';
import { Carousel, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './AppCarousel.module.less';
import ButtonApp from '../ButtonApp/ButtonApp';

const { Title, Text } = Typography;

const AppCarousel: FC = () => {
  // Невозможно дать конкретный тип, так как должен быть сложный объект компоненты carousel
  const carouselRef = useRef<any>(null);

  const handleNext = () => carouselRef.current.next();
  const handlePrev = () => carouselRef.current.prev();

  return (
    <div className={styles.AppCarousel}>
      <button type="button" className={styles.prevArrow} onClick={handlePrev}>
        <LeftOutlined />
      </button>
      <Carousel ref={carouselRef} className={styles.carousel}>
        <div className={`${styles.carouselContent} ${styles.carouselImg1}`}>
          <Title level={2} className={`${styles.carouselTitle} ${styles.text__white}`}>
            Бесплатная парковка
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white}`}>
            Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а
            также в аэропортах
          </Text>
          <div className={`${styles.button} ${styles.buttonGreen}`}>
            <ButtonApp>Подробнее</ButtonApp>
          </div>
        </div>
        <div className={`${styles.carouselContent} ${styles.carouselImg2}`}>
          <Title level={2} className={`${styles.carouselTitle} ${styles.text__white}`}>
            Страховка
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white} `}>
            Полная страховка страховка автомобиля
          </Text>
          <div className={`${styles.button} ${styles.buttonBlue}`}>
            <ButtonApp>Подробнее</ButtonApp>
          </div>
        </div>
        <div className={`${styles.carouselContent} ${styles.carouselImg3}`}>
          <Title level={2} className={`${styles.carouselTitle} ${styles.text__white}`}>
            Бензин
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white} `}>
            Полный бак на любой заправке города за наш счёт
          </Text>
          <div className={`${styles.button} ${styles.buttonRed}`}>
            <ButtonApp>Подробнее</ButtonApp>
          </div>
        </div>
        <div className={`${styles.carouselContent} ${styles.carouselImg4}`}>
          <Title level={2} className={`${styles.carouselTitle} ${styles.text__white}`}>
            Обслуживание
          </Title>
          <Text className={`${styles.carouselText} ${styles.text__white} `}>
            Автомобиль проходит еженедельное ТО
          </Text>
          <div className={`${styles.button} ${styles.buttonPurple}`}>
            <ButtonApp>Подробнее</ButtonApp>
          </div>
        </div>
      </Carousel>
      <button type="button" className={styles.nextArrow} onClick={handleNext}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default AppCarousel;
