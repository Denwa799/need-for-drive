import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { privateRoutes, publicRoutes } from 'router';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { authSelector } from 'store/selectors/selectors';
import { Admin } from 'pages/Admin';

const AppRouter: FC = () => {
  const { isAuth } = useTypedSelector(authSelector);

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<route.component />} key={route.path} />
      ))}
      {isAuth && (
        <Route path={`${RouteNames.ADMIN}/*`} element={<Admin />}>
          {privateRoutes.map((route) => (
            <Route path={route.path} element={<route.component />} key={route.path} />
          ))}
          <Route path="*" element={<Navigate to={RouteNames.LOGIN} />} />
        </Route>
      )}
      <Route path="/admin/*" element={<Navigate to={RouteNames.LOGIN} />} />
      <Route path="*" element={<Navigate to={RouteNames.MAIN} />} />
    </Routes>
  );
};

export default AppRouter;
