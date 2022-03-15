import React from 'react';
import 'antd/dist/antd.less';
import AppRouter from './components/AppRouter/AppRouter';
import Navigation from './components/ui/Navigation/Navigation';

const App = () => {
  return (
    <div>
      <Navigation />
      <AppRouter />
    </div>
  );
};

export default App;
