import React from 'react';
import 'antd/dist/antd.less';
import { Layout } from 'antd';
import AppRouter from './components/AppRouter/AppRouter';

const App = () => {
  return (
    <Layout>
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
