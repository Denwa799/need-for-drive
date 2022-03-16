import React, { FC } from 'react';
import { Typography, Col, Layout, Row } from 'antd';
import Icon from '@ant-design/icons';
import styles from './Main.module.less';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import AppCarousel from '../../ui/AppCarousel/AppCarousel';
import LocationSvg from '../../ui/CustomIcns/LocationSvg';

const { Title, Text } = Typography;

const Main: FC = () => {
  return (
    <Layout>
      <Row className={styles.Main}>
        <Col span={1} className={styles.Nav}>
          нав
        </Col>
        <Col span={12}>
          <Row className={`${styles.container} ${styles.header}`} align="middle">
            <Col span={12} className={styles.Logo}>
              Need for drive
            </Col>
            <Col span={12} className={`${styles.header__right} ${styles.text__darkGray}`}>
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
        </Col>
        <Col span={11}>
          <AppCarousel />
        </Col>
      </Row>
    </Layout>
  );
};

export default Main;
