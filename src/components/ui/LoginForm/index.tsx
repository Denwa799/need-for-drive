import React, { FC } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { formRules } from 'utils/formRules';
import styles from './styles.module.less';
import { ILoginForm } from './type';

const { Title, Text } = Typography;

export const LoginForm: FC<ILoginForm> = ({ submit }) => {
  return (
    <div className={styles.LoginForm}>
      <Row className={styles.formBlock}>
        <Row className={styles.titleContainer}>
          <Col className={styles.title} span={24}>
            Вход
          </Col>
        </Row>
        <Row className={styles.formContainer}>
          <Col span={24}>
            <Form onFinish={submit}>
              <Text className={styles.text}>Почта</Text>
              <Form.Item
                name="username"
                rules={[formRules.required('Пожалуйста введи вашу почту!')]}
              >
                <Input className={styles.input} />
              </Form.Item>
              <Text className={styles.text}>Пароль</Text>
              <Form.Item
                name="password"
                rules={[formRules.required('Пожалуйста введи ваш пароль!')]}
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
  );
};
