import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Col, Layout, Row } from 'antd';
import Navigation from 'components/ui/Navigation/Navigation';
import AppContainer from 'layouts/AppContainer/AppContainer';
import AppHeader from 'layouts/AppHeader/AppHeader';
import { RouteNames } from 'router/routes';
import ButtonApp from 'components/ui/ButtonApp/ButtonApp';
import AppFooter from 'layouts/AppFooter/AppFooter';
import AppCarousel from 'components/ui/AppCarousel/AppCarousel';
import { MainPageSlider } from './slider';
import styles from './Main.module.less';

const { Title, Text } = Typography;

const Main: FC = () => {
  return (
    <Row className={styles.Main}>
      <Col xl={1} lg={2} md={2} sm={2} xs={24}>
        <Navigation />
      </Col>
      <Col xl={12} lg={13} md={13} sm={22} xs={24} className={styles.mainContent}>
        <AppContainer>
          <AppHeader />
        </AppContainer>
        <Layout.Content>
          <AppContainer>
            <Row className={styles.body}>
              <Row>
                <Col span={24}>
                  <Title level={1} className={`${styles.bodyTitle} ${styles.text__bold}`}>
                    Каршеринг <br />{' '}
                    <span className={styles.text__primaryColor}>Need for drive</span>
                  </Title>
                  <Text
                    className={`${styles.text__darkGray} ${styles.text__light} ${styles.bodyText}`}
                  >
                    Поминутная аренда авто твоего города
                  </Text>
                </Col>
              </Row>
            </Row>
          </AppContainer>
          <Row className={styles.bodyButton}>
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
        <AppCarousel items={MainPageSlider} />
      </Col>
    </Row>
  );
};

export default Main;
