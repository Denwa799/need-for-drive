import React, { useEffect } from 'react';
import 'antd/dist/antd.less';
import { useCookies } from 'react-cookie';
import AppRouter from './components/AppRouter/AppRouter';
import { useActions } from './hooks/useActions';

const App = () => {
  const { checkAuth } = useActions();
  const [cookies] = useCookies(['auth']);

  useEffect(() => {
    if (cookies.auth) {
      const secretKey = cookies.auth.key;
      const refreshToken = cookies.auth.refresh_token;
      if (secretKey && refreshToken) {
        checkAuth(secretKey, refreshToken);
      }
    }
  }, []);

  return <AppRouter />;
};

export default App;
