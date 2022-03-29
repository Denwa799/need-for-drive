import React, { FC, useState } from 'react';
import { Col, Radio, Row, Typography } from 'antd';
import cn from 'classnames';
import styles from './FormModel.module.less';

import car1 from '../../../../assets/img/cars/image-1.webp';
import car2 from '../../../../assets/img/cars/image-2.webp';
import car3 from '../../../../assets/img/cars/image-3.webp';
import car4 from '../../../../assets/img/cars/image-4.webp';

const { Title, Text } = Typography;

const FormModel: FC = () => {
  const [value, setValue] = useState('all');

  const onChangeHandler = (e: any) => {
    // Стоит any, так как сюда приходит событие и value из компоненты radio библиотеки ant design
    setValue(e.target.value);
  };

  return (
    <div className={styles.FormModel}>
      <Radio.Group onChange={onChangeHandler} value={value} className={styles.RadioGroup}>
        <Radio value="all" className={cn(styles.Radio, { [styles.RadioActive]: value === 'all' })}>
          Все модели
        </Radio>
        <Radio
          value="econom"
          className={cn(styles.Radio, { [styles.RadioActive]: value === 'econom' })}
        >
          Эконом
        </Radio>
        <Radio
          value="prem"
          className={cn(styles.Radio, { [styles.RadioActive]: value === 'prem' })}
        >
          Премиум
        </Radio>
      </Radio.Group>
      <Row className={styles.cards}>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              ELANTRA
            </Title>
            <Text className={styles.cardText}>12 000 - 25 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car1} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              I30 N
            </Title>
            <Text className={styles.cardText}>10 000 - 32 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car2} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              CRETA
            </Title>
            <Text className={styles.cardText}>12 000 - 25 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car3} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              SONATA
            </Title>
            <Text className={styles.cardText}>10 000 - 32 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car4} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              ELANTRA
            </Title>
            <Text className={styles.cardText}>12 000 - 25 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car1} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              I30 N
            </Title>
            <Text className={styles.cardText}>10 000 - 32 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car2} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              CRETA
            </Title>
            <Text className={styles.cardText}>12 000 - 25 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car3} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              SONATA
            </Title>
            <Text className={styles.cardText}>10 000 - 32 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car4} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              ELANTRA
            </Title>
            <Text className={styles.cardText}>12 000 - 25 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car1} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              I30 N
            </Title>
            <Text className={styles.cardText}>10 000 - 32 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car2} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              CRETA
            </Title>
            <Text className={styles.cardText}>12 000 - 25 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car3} alt="car" className={styles.img} />
          </div>
        </Col>
        <Col span={12} className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Title level={5} className={styles.cardTitle}>
              SONATA
            </Title>
            <Text className={styles.cardText}>10 000 - 32 000 ₽</Text>
          </div>
          <div className={styles.imgContainer}>
            <img src={car4} alt="car" className={styles.img} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormModel;
