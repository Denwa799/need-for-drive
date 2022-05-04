import React, { FC, useCallback } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { formRules } from 'utils/formRules';
import styles from './styles.module.less';
import { ILoginForm } from './type';

const { Text } = Typography;

export const LoginForm: FC<ILoginForm> = ({
  submit,
  usernameValue,
  setUsernameValue,
  passwordValue,
  setPasswordValue,
}) => {
  const formHandler = useCallback(
    (changedValues: { username?: string; password?: string }) => {
      if (changedValues.username) setUsernameValue(changedValues.username);
      if (changedValues.password) setPasswordValue(changedValues.password);
    },
    [usernameValue, passwordValue]
  );

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
            <Form onFinish={submit} onValuesChange={formHandler}>
              <Text className={styles.text}>Почта</Text>
              <Form.Item
                name="username"
                rules={[formRules.required('Пожалуйста введите вашу почту!')]}
                initialValue={usernameValue}
              >
                <Input className={styles.input} />
              </Form.Item>
              <Text className={styles.text}>Пароль</Text>
              <Form.Item
                name="password"
                rules={[formRules.required('Пожалуйста введите ваш пароль!')]}
                initialValue={passwordValue}
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
