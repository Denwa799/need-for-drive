import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './ButtonChange.module.less';
import { IButtonChange } from './type';

const ButtonChange: FC<IButtonChange> = ({ children, value, changeLang }) => {
  return (
    <Button type="text" className={styles.ButtonChange} onClick={(event) => changeLang(value)}>
      {children}
    </Button>
  );
};

export default ButtonChange;
