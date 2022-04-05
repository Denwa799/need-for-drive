import React, { FC } from 'react';
import { Col, Layout, Row } from 'antd';
import Icon from '@ant-design/icons';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { cityLocationSelector } from 'store/selectors/selectors';
import LocationSvg from 'components/ui/CustomIcns/LocationSvg';
import styles from './AppHeader.module.less';

const AppHeader: FC = () => {
  const { city } = useTypedSelector(cityLocationSelector);

  return (
    <Layout.Header className={styles.AppHeader}>
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={24} className={styles.Logo}>
          Need for drive
        </Col>
        <Col xl={12} lg={12} md={12} sm={12} xs={24} className={styles.location}>
          <Icon className={styles.headerIcn} component={LocationSvg} />
          {city}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default AppHeader;
