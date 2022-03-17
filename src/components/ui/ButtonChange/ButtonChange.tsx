import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './ButtonChange.module.less';

const ButtonChange: FC = ({ children }) => {
  return (
    <Button type="text" className={styles.ButtonChange}>
      {children}
    </Button>
  );
};

export default ButtonChange;
