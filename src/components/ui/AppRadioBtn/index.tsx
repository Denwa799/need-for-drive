import React, { FC } from 'react';
import { Radio } from 'antd';
import cn from 'classnames';
import { IAppRadioBtn } from './type';
import styles from './styles.module.less';

export const AppRadioBtn: FC<IAppRadioBtn> = ({ children, value, filterValue, activeValue }) => {
  return (
    <Radio
      value={value}
      className={cn(styles.Radio, { [styles.RadioActive]: filterValue === activeValue })}
      checked={filterValue === activeValue}
    >
      {children}
    </Radio>
  );
};
