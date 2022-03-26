import { Button } from 'antd';
import React, { FC } from 'react';
import styles from './ButtonApp.module.less';
import { IButtonApp } from './type';

const ButtonApp: FC<IButtonApp> = ({ children, background, disabled }) => {
  return (
    <Button
      type="primary"
      className={styles.ButtonApp}
      size="large"
      style={{ background: `${background}` }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ButtonApp;
