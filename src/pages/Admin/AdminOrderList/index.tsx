import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { AdminSidebar } from 'layouts/AdminSidebar';
import { AdminHeader } from 'layouts/AdminHeader';
import styles from './styles.module.less';

export const AdminOrderList: FC = () => {
  return (
    <div className={styles.AdminOrderList}>
      <Row>
        <AdminSidebar />
        <Col xl={20} lg={20} md={22} sm={22} xs={22}>
          <AdminHeader />
        </Col>
      </Row>
    </div>
  );
};
