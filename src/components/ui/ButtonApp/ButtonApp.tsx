import { Button } from 'antd';
import React, { FC } from 'react';
import { IButtonApp } from '../../../types/ui';
import styles from './ButtonApp.module.less';

const ButtonApp: FC<IButtonApp> = ({ children, background }) => {
  return (
    <Button
      type="primary"
      className={styles.ButtonApp}
      size="large"
      style={{ background: `${background}` }}
    >
      {children}
    </Button>
  );
};

export default ButtonApp;
