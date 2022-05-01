import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { AdminSidebar } from 'layouts/AdminSidebar';
import { AdminHeader } from 'layouts/AdminHeader';
import styles from './styles.module.less';
import { AdminOrderListContent } from './AdminOrderListContent';
import { AdminFooter } from '../../../layouts/AdminFooter';

export const AdminOrderList: FC = () => {
  return (
    <div className={styles.AdminOrderList}>
      <Row className={styles.container}>
        <AdminSidebar />
        <Col xl={20} lg={20} md={22} sm={22} xs={22}>
          <AdminHeader />
          <AdminOrderListContent />
          <AdminFooter />
        </Col>
      </Row>
    </div>
  );
};
