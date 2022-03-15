import React from 'react';
import 'antd/dist/antd.less';
import styles from './App.module.less';
import AppRouter from './components/AppRouter/AppRouter';
import Navigation from './components/ui/Navigation/Navigation';

const App = () => {
  return (
    <div className={styles.App}>
      <Navigation />
      <AppRouter />
    </div>
  );
};

export default App;
