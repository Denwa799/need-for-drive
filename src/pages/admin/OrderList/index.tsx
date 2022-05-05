import React, { FC, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useActions } from 'hooks/useActions';

export const OrderList: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { logout } = useActions();

  const logoutHandler = useCallback(() => {
    removeCookie('auth', { path: '/' });
    logout();
  }, []);

  return (
    <div>
      Страница списка заказов{' '}
      <button type="button" onClick={logoutHandler}>
        Выход
      </button>
    </div>
  );
};
