import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes, RouteNames } from '../../router';

const AppRouter: FC = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<route.component />} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.MAIN} />} />
    </Routes>
  );
};

export default AppRouter;
