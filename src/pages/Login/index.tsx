import { Row, Typography } from 'antd';
import React, { FC, useCallback, useEffect } from 'react';
import LogoSvg from 'components/ui/CustomIcns/LogoSvg';
import Icon from '@ant-design/icons';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { authSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { LoginForm } from 'components/ui/LoginForm';
import { setAuthCookie } from 'utils/setAuthCookie';
import styles from './styles.module.less';

const { Title } = Typography;

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
    if (Object.keys(authToken).length !== 0 && authSecretKey) {
      setAuthCookie('auth', '/', authToken, authSecretKey, setCookie);
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
            <LoginForm submit={submit} />
          </div>
        </div>
      )}
    </div>
  );
};