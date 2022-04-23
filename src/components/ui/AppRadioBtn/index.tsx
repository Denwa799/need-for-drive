import React, { FC } from 'react';
import { Radio } from 'antd';
import cn from 'classnames';
import { IAppRadioBtn } from './type';
import styles from './styles.module.less';

export const AppRadioBtn: FC<IAppRadioBtn> = ({ children, value, filterValue, onClick }) => {
  return (
    <Radio
      value={value}
      className={cn(styles.Radio, { [styles.RadioActive]: filterValue === value })}
      checked={filterValue === value}
      onClick={onClick}
    >
      {children}
    </Radio>
  );
};
