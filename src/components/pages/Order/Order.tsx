import React, { FC } from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import styles from './Order.module.less';
import Navigation from '../../ui/Navigation/Navigation';
import AppHeader from '../../ui/AppLayout/AppHeader/AppHeader';
import AppContainer from '../../ui/AppLayout/AppContainer/AppContainer';
import FormLocation from './FormLocation/FormLocation';
import PriceForm from './PriceForm/PriceForm';

const Order: FC = () => {
  return (
    <Row className={styles.Order}>
      <Navigation />
      <Col xl={23} lg={22} md={22} sm={22} xs={24} className={styles.mainContent}>
        <AppContainer>
          <AppHeader />
        </AppContainer>
        <hr className={styles.hrTop} />
        <AppContainer>
          <Breadcrumb separator="►" className={styles.breadcrumb}>
            <Breadcrumb.Item className={styles.breadcrumbActive}>Местоположение</Breadcrumb.Item>
            <Breadcrumb.Item>Модель</Breadcrumb.Item>
            <Breadcrumb.Item>Дополнительно</Breadcrumb.Item>
            <Breadcrumb.Item className={styles.breadcrumbFinal}>Итого</Breadcrumb.Item>
          </Breadcrumb>
        </AppContainer>
        <hr />
        <Row>
          <Col xl={14} lg={12} md={24} sm={24} xs={24} className={styles.mainForm}>
            <AppContainer>
              <FormLocation />
            </AppContainer>
          </Col>
          <Col xl={10} lg={12} md={24} sm={24} xs={24}>
            <AppContainer>
              <PriceForm />
            </AppContainer>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Order;
