import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Col, Layout, Row } from 'antd';
import styles from './Main.module.less';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import AppCarousel from '../../ui/AppCarousel/AppCarousel';
import { MainPageSlider } from './slider';
import { RouteNames } from '../../../utils/routes';
import Navigation from '../../ui/Navigation/Navigation';
import AppHeader from '../../ui/AppLayout/AppHeader/AppHeader';
import AppFooter from '../../ui/AppLayout/AppFooter/AppFooter';

const { Title, Text } = Typography;

const Main: FC = () => {
  const slider = MainPageSlider;

  return (
    <Row className={styles.Main}>
      <Navigation />
      <Col xl={12} lg={13} md={13} sm={22} xs={24} className={styles.mainContent}>
        <AppHeader />
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
        <AppFooter xl={12} lg={12} md={12} sm={12} xs={24} />
      </Col>
      <Col xl={11} lg={9} md={9} className={`${styles.carousel}`}>
        <AppCarousel items={slider} />
      </Col>
    </Row>
  );
};

export default Main;
