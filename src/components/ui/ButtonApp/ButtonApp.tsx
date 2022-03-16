import { Button } from 'antd';
import React, { FC } from 'react';
import styles from './ButtonApp.module.less';

const ButtonApp: FC = () => {
  return (
    <Button type="primary" className={styles.ButtonApp} size="large">
      Забронировать
    </Button>
  );
};

export default ButtonApp;
