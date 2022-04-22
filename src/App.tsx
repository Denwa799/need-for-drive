import React, { useEffect } from 'react';
import 'antd/dist/antd.less';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import AppRouter from './components/AppRouter/AppRouter';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypesSelector';
import { authSelector } from './store/selectors/selectors';

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

  return <AppRouter />;
};

export default App;
