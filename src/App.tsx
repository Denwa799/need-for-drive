import React, { useEffect } from 'react';
import 'antd/dist/antd.less';
import { useCookies } from 'react-cookie';
import AppRouter from './components/AppRouter/AppRouter';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypesSelector';
import { authSelector } from './store/selectors/selectors';
import { setAuthCookie } from './utils/setAuthCookie';

const App = () => {
  const { checkAuth } = useActions();
  const [cookies, setCookie] = useCookies(['auth']);
  const { authToken, authSecretKey } = useTypedSelector(authSelector);

  useEffect(() => {
    if (cookies.auth) {
      const secretKey = cookies.auth.key;
      const refreshToken = cookies.auth.refresh_token;
      if (secretKey && refreshToken) {
        checkAuth(secretKey, refreshToken);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(authToken).length !== 0 && authSecretKey) {
      setAuthCookie('auth', '/', authToken, authSecretKey, setCookie);
    }
  }, [authToken, authSecretKey]);

  return <AppRouter />;
};

export default App;
