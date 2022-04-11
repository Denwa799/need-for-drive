import React, { FC } from 'react';
import { Radio } from 'antd';
import cn from 'classnames';
import { IAppRadioBtn } from './type';
import styles from './styles.module.less';

export const AppRadioBtn: FC<IAppRadioBtn> = ({ value, filterValue }) => {
  return (
    <Radio
      value={value}
      className={cn(styles.Radio, { [styles.RadioActive]: filterValue === value })}
    >
      {value}
    </Radio>
  );
};
