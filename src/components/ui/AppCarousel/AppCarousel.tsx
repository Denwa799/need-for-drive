import React, { FC, useRef } from 'react';
import { Carousel, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './AppCarousel.module.less';
import ButtonApp from '../ButtonApp/ButtonApp';
import { IAppCarousel } from './type';

const { Title, Text } = Typography;

const AppCarousel: FC<IAppCarousel> = ({ items }) => {
  // Невозможно дать конкретный тип, так как должен быть сложный объект компоненты carousel
  const carouselRef = useRef<any>(null);

  const handleNext = () => carouselRef.current.next();
  const handlePrev = () => carouselRef.current.prev();

  return (
    <div className={styles.AppCarousel}>
      <button type="button" className={styles.prevArrow} onClick={handlePrev}>
        <LeftOutlined />
      </button>
      <Carousel ref={carouselRef} className={styles.carousel} autoplay>
        {items.map((item) => {
          return (
            <div key={item.key} className={`${styles.carouselContent} ${item.backgroundClassName}`}>
              <Title level={2} className={`${styles.carouselTitle} ${styles.text__white}`}>
                {item.title}
              </Title>
              <Text className={`${styles.carouselText} ${styles.text__white}`}>{item.text}</Text>
              <div className={`${styles.button}`}>
                <ButtonApp background={item.btnBackground}>{item.button}</ButtonApp>
              </div>
            </div>
          );
        })}
      </Carousel>
      <button type="button" className={styles.nextArrow} onClick={handleNext}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default AppCarousel;
