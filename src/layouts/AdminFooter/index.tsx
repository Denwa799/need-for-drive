import { Col, Row } from 'antd';
import React from 'react';
import styles from './styles.module.less';

export const AdminFooter = () => {
  return (
    <div className={styles.AdminFooter}>
      <Row className={styles.content}>
        <Col xl={12} lg={12} md={12} sm={24} xs={24} className={styles.leftBlock}>
          <span className={styles.link}>Главная страница</span>
          <span className={styles.link}>Ссылка</span>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24} className={styles.rightBlock}>
          <span className={styles.copyright}>Copyright © 2020 Simbirsoft</span>
        </Col>
      </Row>
    </div>
  );
};
