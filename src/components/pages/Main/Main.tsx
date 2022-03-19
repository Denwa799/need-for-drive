import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Col, Layout, Row } from 'antd';
import Icon from '@ant-design/icons';
import styles from './Main.module.less';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import AppCarousel from '../../ui/AppCarousel/AppCarousel';
import LocationSvg from '../../ui/CustomIcns/LocationSvg';
import ButtonChange from '../../ui/ButtonChange/ButtonChange';
import Navbar from '../../ui/Nabvar/Navbar';
import { MainPageSlider } from './slider';
import { RouteNames } from '../../../utils/routes';

const { Title, Text } = Typography;

const Main: FC = () => {
  const slider = MainPageSlider;

  return (
    <Row className={styles.Main}>
      <Col xl={1} lg={2} md={2} sm={2} xs={24} className={styles.Nav}>
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
      <Col xl={12} lg={13} md={13} sm={22} xs={24} className={styles.mainContent}>
        <Layout.Header className={`${styles.header}`}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={24} className={styles.Logo}>
              Need for drive
            </Col>
            <Col
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className={`${styles.headerTxt} ${styles.text__right} ${styles.text__darkGray}`}
            >
              <Icon className={styles.headerIcn} component={LocationSvg} />
              Ульяновск
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content>
          <Row className={`${styles.container} ${styles.body}`}>
            <Row>
              <Col span={24}>
                <Title level={1} className={`${styles.bodyTitle} ${styles.text__bold}`}>
                  Каршеринг <br /> <span className={styles.text__primaryColor}>Need for drive</span>
                </Title>
                <Text
                  className={`${styles.text__darkGray} ${styles.text__light} ${styles.bodyText}`}
                >
                  Поминутная аренда авто твоего города
                </Text>
              </Col>
            </Row>
          </Row>
          <Row className={`${styles.container} ${styles.bodyButton}`}>
            <Col span={24} className={styles.button}>
              <NavLink to={RouteNames.ORDER}>
                <ButtonApp>Забронировать</ButtonApp>
              </NavLink>
            </Col>
          </Row>
        </Layout.Content>
        <Layout.Footer className={styles.mainFooter}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={24} className={styles.footerTxt}>
              © 2016-2019 «Need for drive»
            </Col>
            <Col
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className={`${styles.text__right} ${styles.footerNum}`}
            >
              8 (495) 234-22-44
            </Col>
          </Row>
        </Layout.Footer>
      </Col>
      <Col xl={11} lg={9} md={9} className={`${styles.carousel}`}>
        <AppCarousel items={slider} />
      </Col>
    </Row>
  );
};

export default Main;
