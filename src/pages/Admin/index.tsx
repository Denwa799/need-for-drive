import React from 'react';
import { Col, Row } from 'antd';
import { AdminSidebar } from 'layouts/AdminSidebar';
import { AdminFooter } from 'layouts/AdminFooter';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from 'layouts/AdminHeader';
import styles from './styles.module.less';

export const Admin = () => {
  return (
    <div className={styles.Admin}>
      <Row className={styles.content}>
        <AdminSidebar />
        <Col xl={20} lg={20} md={22} sm={22} xs={22}>
          <AdminHeader />
          <Outlet />
          <AdminFooter />
        </Col>
      </Row>
    </div>
  );
};
