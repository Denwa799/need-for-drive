import React, { FC } from 'react';
import { Col, Layout, Row } from 'antd';
import Icon from '@ant-design/icons';
import styles from './AppHeader.module.less';
import LocationSvg from '../../CustomIcns/LocationSvg';

const AppHeader: FC = () => {
  return (
    <Layout.Header className={styles.AppHeader}>
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={24} className={styles.Logo}>
          Need for drive
        </Col>
        <Col xl={12} lg={12} md={12} sm={12} xs={24} className={styles.location}>
          <Icon className={styles.headerIcn} component={LocationSvg} />
          Ульяновск
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default AppHeader;
