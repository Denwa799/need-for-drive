import React from 'react';
import { Col } from 'antd';
import { Desktop } from './Desktop';
import styles from './styles.module.less';
import { Mobile } from './Mobile';

export const AdminSidebar = () => {
  return (
    <Col xl={4} lg={4} md={2} sm={2} xs={2} className={styles.AdminSidebar}>
      <div className={styles.desktop}>
        <Desktop />
      </div>
      <div className={styles.mobile}>
        <Mobile />
      </div>
    </Col>
  );
};
