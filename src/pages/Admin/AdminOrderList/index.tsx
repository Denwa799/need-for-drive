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
        <Col span={20}>
          <AdminHeader />
        </Col>
      </Row>
    </div>
  );
};
