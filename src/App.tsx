import React from 'react';
import 'antd/dist/antd.less';
import styles from './App.module.less';

import AppRouter from './components/AppRouter/AppRouter';

const App = () => {
  return (
    <div className={styles.App}>
      <AppRouter />
    </div>
  );
};

export default App;
