import React from 'react';
import { Col, Row } from 'antd';
import { AdminSidebar } from 'layouts/AdminSidebar';
import { AdminHeader } from 'layouts/AdminHeader';
import styles from './styles.module.less';
import { AdminFooter } from '../../../layouts/AdminFooter';

export const AdminCarsList = () => {
  return (
    <div className={styles.AdminCarsList}>
      <Row className={styles.container}>
        <AdminSidebar />
        <Col xl={20} lg={20} md={22} sm={22} xs={22}>
          <AdminHeader />
          <p>Список машин</p>
          <AdminFooter />
        </Col>
      </Row>
    </div>
  );
};
