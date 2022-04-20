import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React, { FC } from 'react';
import LogoSvg from 'components/ui/CustomIcns/LogoSvg';
import Icon from '@ant-design/icons';
import styles from './styles.module.less';

const { Title, Text } = Typography;

export const Login: FC = () => {
  return (
    <div className={styles.Login}>
      <div className={styles.LoginContent}>
        <Row className={styles.logoBlock}>
          <Icon component={LogoSvg} />
          <Title level={3} className={styles.title}>
            Need for drive
          </Title>
        </Row>
        <Row className={styles.formBlock}>
          <Row className={styles.titleContainer}>
            <Col className={styles.title} span={24}>
              Вход
            </Col>
          </Row>
          <Row className={styles.formContainer}>
            <Col span={24}>
              <Form>
                <Text className={styles.text}>Почта</Text>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Невалидный E-mail!',
                    },
                    { required: true, message: 'Пожалуйста введи вашу почту!' },
                  ]}
                >
                  <Input className={styles.input} />
                </Form.Item>
                <Text className={styles.text}>Пароль</Text>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста введи ваш пароль!' }]}
                >
                  <Input.Password className={styles.input} />
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item>
                      <Button type="link" className={styles.link}>
                        Запросить доступ
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.text__right}>
                      <Button type="primary" htmlType="submit" className={styles.submit}>
                        Войти
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Row>
      </div>
    </div>
  );
};
