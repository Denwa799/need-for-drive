import React, { FC } from 'react';
import { Col, Row } from 'antd';
import styles from './Navigation.module.less';
import Navbar from './Navbar/Navbar';
import ButtonChange from '../ButtonChange/ButtonChange';

const Navigation: FC = () => {
  return (
    <Col xl={1} lg={2} md={2} sm={2} xs={24} className={styles.Navigation}>
      <Row>
        <Col span={24} className={styles.burger}>
          <Navbar />
        </Col>
      </Row>
      <Row className={`${styles.navFooter}`}>
        <Col span={24} className={styles.langButton}>
          <ButtonChange>Eng</ButtonChange>
        </Col>
      </Row>
    </Col>
  );
};

export default Navigation;
