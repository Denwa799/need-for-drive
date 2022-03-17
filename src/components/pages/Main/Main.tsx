import React, { FC } from 'react';
import { Typography, Col, Layout, Row } from 'antd';
import Icon from '@ant-design/icons';
import styles from './Main.module.less';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import AppCarousel from '../../ui/AppCarousel/AppCarousel';
import LocationSvg from '../../ui/CustomIcns/LocationSvg';
import ButtonChange from '../../ui/ButtonChange/ButtonChange';
import Navbar from '../../ui/Nabvar/Navbar';

const { Title, Text } = Typography;

const Main: FC = () => {
  return (
    <Layout>
      <Row className={styles.Main}>
        <Col span={1} className={styles.Nav}>
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
        <Col span={12} className={styles.mainContent}>
          <Row className={`${styles.container} ${styles.header}`}>
            <Col span={12} className={styles.Logo}>
              Need for drive
            </Col>
            <Col span={12} className={`${styles.text__right} ${styles.text__darkGray}`}>
              <Icon className={styles.headerIcn} component={LocationSvg} />
              Ульяновск
            </Col>
          </Row>
          <Row className={`${styles.container} ${styles.body}`}>
            <Row>
              <Col span={24}>
                <Title level={1} className={styles.text__bold}>
                  Каршеринг <br /> <span className={styles.text__primaryColor}>Need for drive</span>
                </Title>
                <Text
                  className={`${styles.text__darkGray} ${styles.text__light} ${styles.text__26px}`}
                >
                  Поминутная аренда авто твоего города
                </Text>
              </Col>
            </Row>
            <Col span={24} className={styles.button}>
              <ButtonApp />
            </Col>
          </Row>
          <Row className={`${styles.container} ${styles.mainFooter}`}>
            <Col span={12} className={styles.text__darkGray}>
              © 2016-2019 «Need for drive»
            </Col>
            <Col span={12} className={`${styles.text__right}`}>
              8 (495) 234-22-44
            </Col>
          </Row>
        </Col>
        <Col span={11} className={`${styles.carousel}`}>
          <AppCarousel />
        </Col>
      </Row>
    </Layout>
  );
};

export default Main;
