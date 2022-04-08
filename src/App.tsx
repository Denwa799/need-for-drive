import React from 'react';
import 'antd/dist/antd.less';
import locale from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';
import AppRouter from './components/AppRouter/AppRouter';

const App = () => {
  return (
    <ConfigProvider locale={locale}>
      <AppRouter />
    </ConfigProvider>
  );
};

export default App;
