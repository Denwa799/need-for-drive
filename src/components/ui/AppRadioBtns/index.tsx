import React, { FC } from 'react';
import { Radio } from 'antd';
import styles from './styles.module.less';
import { IAppRadioBtns } from './type';

export const AppRadioGroup: FC<IAppRadioBtns> = ({ children, onChange, filterValue }) => {
  return (
    <Radio.Group onChange={onChange} value={filterValue} className={styles.RadioGroup}>
      {children}
    </Radio.Group>
  );
};
