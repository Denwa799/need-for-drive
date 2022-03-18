import { Button } from 'antd';
import React, { FC } from 'react';
import styles from './ButtonApp.module.less';

const ButtonApp: FC = ({ children }) => {
  return (
    <Button type="primary" className={styles.ButtonApp} size="large">
      {children}
    </Button>
  );
};

export default ButtonApp;
