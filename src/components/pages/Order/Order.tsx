import React, { FC } from 'react';
import { Row } from 'antd';
import styles from './Order.module.less';
import Navigation from '../../ui/Navigation/Navigation';

const Order: FC = () => {
  return (
    <Row className={styles.Order}>
      <Navigation />
    </Row>
  );
};

export default Order;
