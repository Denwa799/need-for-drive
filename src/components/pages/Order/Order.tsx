import React, { FC } from 'react';
import { Col, Row } from 'antd';
import styles from './Order.module.less';
import Navigation from '../../ui/Navigation/Navigation';
import AppHeader from '../../ui/AppLayout/AppHeader/AppHeader';
import AppContainer from '../../ui/AppLayout/Container/AppContainer';

const Order: FC = () => {
  return (
    <Row className={styles.Order}>
      <Navigation />
      <Col xl={23} lg={22} md={22} sm={22} xs={24} className={styles.mainContent}>
        <AppContainer>
          <AppHeader />
        </AppContainer>
      </Col>
    </Row>
  );
};

export default Order;
