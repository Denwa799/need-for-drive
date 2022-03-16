import React from 'react';
import 'antd/dist/antd.less';
import { Layout } from 'antd';
import AppRouter from './components/AppRouter/AppRouter';
import Navigation from './components/ui/Navigation/Navigation';

const App = () => {
  return (
    <Layout>
      <Navigation />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
