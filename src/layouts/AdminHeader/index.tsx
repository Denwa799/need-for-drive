import React, { useCallback } from 'react';
import { AutoComplete, Avatar, Badge, Col, Input, Menu, Row } from 'antd';
import { BellSvg } from 'components/ui/CustomIcns/BellSvg';
import avatar1 from 'assets/img/avatar/avatar1.webp';
import Icon, { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import { useActions } from 'hooks/useActions';
import { useCookies } from 'react-cookie';
import styles from './styles.module.less';

export const AdminHeader = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { logout } = useActions();

  const logoutHandler = useCallback(() => {
    removeCookie('auth', { path: '/' });
    logout();
  }, []);

  return (
    <Row className={styles.AdminHeader}>
      <Col xl={18} lg={16} md={16} sm={14} xs={10}>
        <AutoComplete className={styles.AdminSearchAutocomplete}>
          <Input
            placeholder="Поиск..."
            prefix={<SearchOutlined className={styles.icn} />}
            className={styles.input}
          />
        </AutoComplete>
      </Col>
      <Col xl={6} lg={8} md={8} sm={10} xs={14}>
        <Row className={styles.rightBlock}>
          <Col span={4} className={styles.notification}>
            <Badge className={styles.badge} count={2}>
              <Icon component={BellSvg} />
            </Badge>
          </Col>
          <Col span={20} className={styles.userContainer}>
            <div className={styles.avatar}>
              <Avatar src={avatar1} size="large" />
            </div>
            <Menu className={styles.menu} mode="inline" expandIcon={<CaretDownOutlined />}>
              <Menu.SubMenu key={0} title="Denwa">
                <Menu.Item key={1} className={styles.item} onClick={logoutHandler}>
                  Выход
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
