import React, { FC } from 'react';
import { Radio } from 'antd';
import cn from 'classnames';
import styles from './styles.module.less';
import { IAppRadioBtn } from './type';

export const AppRadioBtn: FC<IAppRadioBtn> = ({ onChange, filterValue }) => {
  return (
    <Radio.Group onChange={onChange} value={filterValue} className={styles.RadioGroup}>
      <Radio
        value="Все"
        className={cn(styles.Radio, { [styles.RadioActive]: filterValue === 'Все' })}
      >
        Все модели
      </Radio>
      <Radio
        value="Эконом"
        className={cn(styles.Radio, { [styles.RadioActive]: filterValue === 'Эконом' })}
      >
        Эконом
      </Radio>
      <Radio
        value="Премиум"
        className={cn(styles.Radio, { [styles.RadioActive]: filterValue === 'Премиум' })}
      >
        Премиум
      </Radio>
    </Radio.Group>
  );
};
