import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React, { FC, useCallback, useEffect } from 'react';
import LogoSvg from 'components/ui/CustomIcns/LogoSvg';
import Icon from '@ant-design/icons';
import moment from 'moment';
import { formRules } from 'utils/formRules';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { authSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import styles from './styles.module.less';

const { Title, Text } = Typography;

export const Login: FC = () => {
  const navigate = useNavigate();
  const { isAuth, isAuthLoading, authError, authToken, authSecretKey } =
    useTypedSelector(authSelector);
  const { login } = useActions();
  const [cookies, setCookie] = useCookies(['auth']);

  useEffect(() => {
    if (isAuth) {
      navigate('/admin/order-list');
    }
  }, [isAuth]);

  useEffect(() => {
    // Если данные для cookie есть в store, то к объекту добавляется свойство с секретным ключем
    // и этот объект отправляется в cookie
    if (Object.keys(authToken).length !== 0 && authSecretKey) {
      authToken.key = authSecretKey;

      // Вычисляю дату, до которой будет жить cookie
      const millisecondsNow = moment().valueOf();
      const millisecondsCookie = authToken.expires_in * 1000;
      const cookiesExpiresIn = moment(millisecondsNow + millisecondsCookie).toDate();

      setCookie('auth', authToken, { path: '/', expires: cookiesExpiresIn });
    }
  }, [authToken, authSecretKey]);

  const submit = useCallback((values: { username: string; password: string }) => {
    // Генерирую для токена случайное число от миллиона до 10 миллионов и добавляю секретный ключ
    const secretKey = `${Math.floor(Math.random() * (100000000 - 1000000)) + 1000000}:${
      process.env.REACT_APP_AUTH_SECRET_KEY
    }`;
    const token = btoa(secretKey);
    login(values.username, values.password, token);
  }, []);

  return (
    <div>
      {isAuthLoading || authError ? (
        <ErrorLoading loading={isAuthLoading} error={authError} />
      ) : (
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
        </div>
      )}
    </div>
  );
};
