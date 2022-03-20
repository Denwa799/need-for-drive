import React, { FC } from 'react';
import { Col, Layout, Row } from 'antd';
import styles from './AppFooter.module.less';

interface IAppFooter {
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}

const AppFooter: FC<IAppFooter> = ({ xl, lg, md, sm, xs }) => {
  return (
    <Layout.Footer className={styles.AppFooter}>
      <Row>
        <Col xl={xl} lg={lg} md={md} sm={sm} xs={xs} className={styles.footerTxt}>
          © 2016-2019 «Need for drive»
        </Col>
        <Col xl={xl} lg={lg} md={md} sm={sm} xs={xs} className={styles.footerNum}>
          8 (495) 234-22-44
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default AppFooter;
