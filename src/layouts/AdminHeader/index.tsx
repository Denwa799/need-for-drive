import React from 'react';
import { AutoComplete, Avatar, Badge, Col, Input, Menu, Row } from 'antd';
import { BellSvg } from 'components/ui/CustomIcns/BellSvg';
import avatar1 from 'assets/img/avatar/avatar1.webp';
import Icon, { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.less';

export const AdminHeader = () => {
  return (
    <Row className={styles.AdminHeader}>
      <Col span={18}>
        <AutoComplete className={styles.AdminSearchAutocomplete}>
          <Input
            placeholder="Поиск..."
            prefix={<SearchOutlined className={styles.icn} />}
            className={styles.input}
          />
        </AutoComplete>
      </Col>
      <Col span={6}>
        <Row className={styles.rightBlock}>
          <Col span={4} className={styles.notification}>
            <Badge className={styles.badge} count={2}>
              <Icon component={BellSvg} />
            </Badge>
          </Col>
          <Col span={20} className={styles.userContainer}>
            <div>
              <Avatar src={avatar1} size="large" />
            </div>
            <Menu className={styles.menu} mode="inline">
              <Menu.SubMenu key={0} title="Denwa">
                <Menu.Item key={1} className={styles.item}>
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
