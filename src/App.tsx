import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.less';
import styles from './App.module.less';

function App() {
  return (
    <div className={styles.App}>
      <Button type="primary">Создал ветку Review</Button>
    </div>
  );
}

export default App;
