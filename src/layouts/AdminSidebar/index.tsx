import React from 'react';
import { Col } from 'antd';
import { Desktop } from './Desktop';
import styles from './styles.module.less';
import { Mobile } from './Mobile';
import adminSidebarItems from './data';

export const AdminSidebar = () => {
  return (
    <Col xl={4} lg={4} md={2} sm={2} xs={2} className={styles.AdminSidebar}>
      <div className={styles.desktop}>
        <Desktop adminSidebarItems={adminSidebarItems} />
      </div>
      <div className={styles.mobile}>
        <Mobile adminSidebarItems={adminSidebarItems} />
      </div>
    </Col>
  );
};
